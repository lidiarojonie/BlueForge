import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { pool } from "./db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Le decimos a la base de datos que trabaje en tu esquema
pool.on('connect', (client) => {
    client.query('SET search_path TO blueforge');
});

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dinosarioRAWR";

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

interface AuthRequest extends Request {
    customer?: { id: number; username: string; role: string };
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Acceso no autorizado" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.customer = { id: payload.id, username: payload.username, role: payload.role };
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
};

const requireRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.customer) {
            return res.status(401).json({ message: "Acceso no autorizado" });
        }

        if (!roles.map(r => r.toLowerCase()).includes(req.customer.role.toLowerCase())) {
            return res.status(403).json({ message: "Acceso denegado: permisos insuficientes" });
        }

        next();
    };
};

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// ==========================================
// ENDPOINTS DE PRODUCTOS
// ==========================================
app.get("/api/products", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT 
                p.base_product_id AS id, 
                p.name, 
                p.description, 
                p.base_price AS price, 
                p.product_image AS image_url, 
                p.stock, 
                p.active, 
                AVG(r.rating) AS average_rating
            FROM base_products p
            LEFT JOIN reviews r ON p.base_product_id = r.base_product_id
            WHERE p.active = TRUE
            GROUP BY p.base_product_id
            ORDER BY p.base_product_id ASC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error en /api/products:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await pool.query(
            `SELECT base_product_id AS id, name, description, base_price AS price, product_image AS image_url, stock, active 
             FROM base_products WHERE base_product_id = $1`, [id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

// ==========================================
// ENDPOINTS DE LOGIN / REGISTRO
// ==========================================
app.post("/api/auth/register", async (req: Request<{}, {}, { username: string, email: string, password: string }>, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: "Faltan datos" });

        let role = 'customer';
        if (email.toLowerCase().endsWith('@empleado.com')) role = 'employee';

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (first_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id AS id, first_name AS username, email, role",
            [username, email, hashedPassword, role]
        );

        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role } as JwtPayload, JWT_SECRET, { expiresIn: "2h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 2 * 60 * 60 * 1000 });
        res.status(201).json({ message: "Registrado", customer: user });
    } catch (err) {
        console.error("Error en registro:", err);
        res.status(500).json({ error: "Error en registro" });
    }
});

app.post("/api/auth/login", async (req: Request<{}, {}, { identifier?: string; email?: string; password: string }>, res: Response) => {
    try {
        const { identifier, email, password } = req.body;
        const loginIdentifier = identifier || email;

        const userResult = await pool.query(
            "SELECT user_id AS id, first_name AS username, email, password_hash AS password, role FROM users WHERE email = $1 OR first_name = $2",
            [loginIdentifier, loginIdentifier]
        );

        if (userResult.rows.length === 0) return res.status(400).json({ error: "Credenciales inválidas" });

        const user = userResult.rows[0];
        const passwordMatch = (password === user.password) || await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) return res.status(400).json({ error: "Credenciales inválidas" });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role } as JwtPayload, JWT_SECRET, { expiresIn: "2h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 2 * 60 * 60 * 1000 });
        res.json({ message: "Login exitoso", customer: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error("Error en Login:", err);
        res.status(500).json({ error: "Error interno del servidor en el login" });
    }
});

app.get("/api/auth/me", authenticateToken, (req: AuthRequest, res: Response) => {
    res.json({ customer: req.customer });
});

app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Sesión cerrada correctamente" });
});

// ==========================================
// ENDPOINTS DE INTRANET (FICHAJES)
// ==========================================
app.get("/api/clock/status", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const employeeId = req.customer!.id;
        const result = await pool.query(
            `SELECT clock_type FROM clock_events WHERE user_id = $1 ORDER BY recorded_at DESC LIMIT 1`,
            [employeeId]
        );
        const isClockedIn = result.rows.length > 0 && result.rows[0].clock_type === "in";
        res.json({ isClockedIn });
    } catch (err) {
        res.status(500).json({ error: "Error al cargar estado" });
    }
});

app.post("/api/clock", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const employeeId = req.customer!.id;
        const { type, note } = req.body as { type: "in" | "out"; note?: string };
        await pool.query(
            `INSERT INTO clock_events (user_id, clock_type, incident, recorded_at) VALUES ($1, $2, $3, NOW())`,
            [employeeId, type, note ?? ""]
        );
        res.status(201).json({ message: "Fichaje registrado" });
    } catch (err) {
        console.error("Error en fichaje", err);
        res.status(500).json({ error: "Error interno" });
    }
});
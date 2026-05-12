import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { pool } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Importamos nuestros DAOs
import { ProductDAO } from "./dao/ProductDAO.js";
import { UserDAO } from "./dao/UserDAO.js";
import { ClockDAO } from "./dao/ClockDAO.js";
import { OrderDAO } from "./dao/OrderDAO.js";

pool.on('connect', (client) => {
    client.query('SET search_path TO blueforge');
});

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dinosarioRAWR";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

interface AuthRequest extends Request {
    customer?: { id: number; username: string; role: string };
}

// MIDDLEWARES
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.token;
    if (!token && req.headers.authorization) token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

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
        if (!req.customer) return res.status(401).json({ message: "Acceso no autorizado" });
        if (!roles.map(r => r.toLowerCase()).includes(req.customer.role.toLowerCase())) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
};

// ==========================================
// RUTAS DE PRODUCTOS
// ==========================================
app.get("/api/products", async (req: Request, res: Response) => {
    try {
        const products = await ProductDAO.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
        const product = await ProductDAO.getProductById(Number(req.params.id));
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================
app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: "Faltan datos" });

        const role = email.toLowerCase().endsWith('@empleado.com') ? 'employee' : 'customer';
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserDAO.createUser(username, email, hashedPassword, role);
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role } as JwtPayload, JWT_SECRET, { expiresIn: "2h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 2 * 60 * 60 * 1000 });
        res.status(201).json({ message: "Registrado", customer: user });
    } catch (err) {
        res.status(500).json({ error: "Error en registro" });
    }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
        const { identifier, email, password } = req.body;
        const loginIdentifier = identifier || email;

        const user = await UserDAO.getUserByEmailOrName(loginIdentifier);
        if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

        const passwordMatch = (password === user.password) || await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ error: "Credenciales inválidas" });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role } as JwtPayload, JWT_SECRET, { expiresIn: "2h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 2 * 60 * 60 * 1000 });
        res.json({ message: "Login exitoso", customer: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: "Error interno en login" });
    }
});
// Obtener todos los pedidos (Solo empleados y admins)
app.get("/api/orders", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const orders = await OrderDAO.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error("Error obteniendo pedidos:", error);
        res.status(500).json({ error: "Error al obtener pedidos" });
    }
});

// Cambiar el estado de un pedido (Solo empleados y admins)
app.put("/api/orders/:id/status", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const orderId = Number(req.params.id);
        const { status } = req.body;
        await OrderDAO.updateOrderStatus(orderId, status);
        res.json({ message: "Estado actualizado correctamente" });
    } catch (error) {
        console.error("Error actualizando pedido:", error);
        res.status(500).json({ error: "Error al actualizar pedido" });
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
// RUTAS DE INTRANET (FICHAJES)
// ==========================================
app.get("/api/clock/status", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const isClockedIn = await ClockDAO.isClockedIn(req.customer!.id);
        res.json({ isClockedIn });
    } catch (err) {
        res.status(500).json({ error: "Error al cargar estado" });
    }
});

app.post("/api/clock", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const { type, note } = req.body;
        await ClockDAO.insertClockEvent(req.customer!.id, type, note ?? "");
        res.status(201).json({ message: "Fichaje registrado" });
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
});
app.get("/api/clock/history", authenticateToken, requireRole("admin", "employee"), async (req: AuthRequest, res: Response) => {
    try {
        const history = await ClockDAO.getHistory(req.customer!.id);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Error al cargar el historial" });
    }
});

// ==========================================
// RUTAS DE PEDIDOS (NUEVO - SOLUCIONA EL 404)
// ==========================================
app.post("/api/orders", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { items, address } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ error: "El carrito está vacío" });

        const order = await OrderDAO.createOrder(req.customer!.id, items, address);
        res.status(201).json({ message: "Pedido creado", order });
    } catch (error) {
        console.error("Error procesando pedido:", error);
        res.status(500).json({ error: "Error procesando pedido" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor DAO escuchando en http://localhost:${PORT}`);
});
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
// RUTAS DE PRODUCTOS Y CATÁLOGO
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

app.get("/api/parts", async (req: Request, res: Response) => {
    try {
        const parts = await ProductDAO.getAllParts();
        res.json(parts);
    } catch (err) {
        res.status(500).json({ error: "Error al cargar las piezas personalizables" });
    }
});

app.post("/api/products", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;
        const newProduct = await ProductDAO.insertProduct(name, description, price, stock, imageUrl);
        res.status(201).json({ message: "Producto añadido al catálogo", product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al guardar el producto" });
    }
});
app.post("/api/parts", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const { category, stock, price, color, imageUrl, baseProductId } = req.body;
        const newPart = await ProductDAO.insertPart(category, stock, price, color, imageUrl, baseProductId || 1);
        res.status(201).json({ message: "Pieza añadida", part: newPart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al guardar la pieza" });
    }
});

// EDITAR PRODUCTO BASE
app.put("/api/products/:id", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;
        await ProductDAO.updateProduct(Number(req.params.id), name, description, price, stock, imageUrl);
        res.json({ message: "Producto actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

// BORRAR PRODUCTO BASE
app.delete("/api/products/:id", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        await ProductDAO.deleteProduct(Number(req.params.id));
        res.json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

// EDITAR PIEZA
app.put("/api/parts/:id", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const { category, stock, price, color, imageUrl, baseProductId } = req.body;
        await ProductDAO.updatePart(Number(req.params.id), category, stock, price, color, imageUrl, baseProductId);
        res.json({ message: "Pieza actualizada" });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar pieza" });
    }
});

// BORRAR PIEZA
app.delete("/api/parts/:id", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        await ProductDAO.deletePart(Number(req.params.id));
        res.json({ message: "Pieza eliminada" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar pieza" });
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

        const user = await UserDAO.createUser(username, 'Desconocido', '', '1900-01-01', email, hashedPassword, role);
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
// RUTAS DE USUARIOS (ADMIN)
// ==========================================
app.get("/api/admin/users", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const users = await UserDAO.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

app.patch("/api/admin/users/:id/role", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const { role } = req.body;
        await UserDAO.updateUserRole(Number(req.params.id), role);
        res.json({ message: "Rol actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar rol" });
    }
});

app.post("/api/admin/users", authenticateToken, requireRole("admin"), async (req: AuthRequest, res: Response) => {
    try {
        const { firstName, lastName, phone, birthDate, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserDAO.createUser(firstName, lastName, phone, birthDate, email, hashedPassword, role || 'customer');
        res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
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
// RUTAS DE PEDIDOS
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


// ==========================================
// 🔥 NUEVO: RUTAS DE FORGE GALLERY (COMUNIDAD) 🔥
// ==========================================

// Obtener todas las builds compartidas (Ordenadas por likes)
app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT shared_build_id AS id, author_name, build_name, base_product_id, build_hash, likes, created_at 
            FROM shared_builds 
            ORDER BY likes DESC, created_at DESC 
            LIMIT 50
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error cargando galería:", error);
        res.status(500).json({ error: "Error al cargar la galería" });
    }
});

// Guardar una nueva build (No requiere auth, pero pedimos nombre)
app.post("/api/gallery", async (req: Request, res: Response) => {
    try {
        const { author_name, build_name, base_product_id, build_hash } = req.body;
        
        if (!author_name || !build_name || !base_product_id || !build_hash) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const result = await pool.query(`
            INSERT INTO shared_builds (author_name, build_name, base_product_id, build_hash) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `, [author_name, build_name, base_product_id, build_hash]);
        
        res.status(201).json({ message: "Build compartida en la galería", build: result.rows[0] });
    } catch (error) {
        console.error("Error publicando en galería:", error);
        res.status(500).json({ error: "Error interno al publicar" });
    }
});

// Sumar o restar un Like
app.post("/api/gallery/:id/like", async (req: Request, res: Response) => {
    try {
        const { action } = req.body; // 'add' o 'remove'
        const buildId = Number(req.params.id);

        let query = "UPDATE shared_builds SET likes = likes + 1 WHERE shared_build_id = $1 RETURNING likes";
        if (action === 'remove') {
            query = "UPDATE shared_builds SET likes = GREATEST(likes - 1, 0) WHERE shared_build_id = $1 RETURNING likes";
        }

        const result = await pool.query(query, [buildId]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Build no encontrada" });
        }

        res.json({ message: "Like actualizado", likes: result.rows[0].likes });
    } catch (error) {
        console.error("Error actualizando like:", error);
        res.status(500).json({ error: "Error al dar like" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
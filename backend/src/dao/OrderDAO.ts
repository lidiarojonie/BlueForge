import { pool } from "../db.ts";

export class OrderDAO {
    static async createOrder(userId: number, items: any[], addressString: string) {
        const client = await pool.connect();
        try {
            console.log("Iniciando creación de pedido para el usuario ID:", userId);
            
            await client.query("BEGIN"); // Empezamos la transacción segura
            
            // 🔥 PARCHE CLAVE: Forzamos el esquema para esta conexión
            await client.query("SET search_path TO blueforge");

            // 1. Guardamos la dirección
            console.log("Guardando dirección...");
            const addressResult = await client.query(
                "INSERT INTO addresses (street_address, postal_code, city, province, country) VALUES ($1, '00000', 'Ciudad', 'Provincia', 'España') RETURNING address_id",
                [addressString]
            );
            const addressId = addressResult.rows[0].address_id;

            // 2. Asociamos la dirección al usuario
            await client.query(
                "INSERT INTO user_addresses (user_id, address_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
                [userId, addressId]
            );

            // 3. Creamos el pedido en 'orders'
            console.log("Guardando tabla orders...");
            const orderResult = await client.query(
                "INSERT INTO orders (order_date, order_status, payment_method, user_id, address_id) VALUES (NOW(), 'pending', 'card', $1, $2) RETURNING order_id",
                [userId, addressId]
            );
            const orderId = orderResult.rows[0].order_id;

            // 4. Metemos cada producto en 'order_items' y restamos el stock
            console.log("Guardando items del pedido...");
            for (const item of items) {
                await client.query(
                    "INSERT INTO order_items (unit_price, quantity, order_id, base_product_id) VALUES ($1, $2, $3, $4)",
                    [item.price, item.quantity, orderId, item.product_id]
                );
                
                // Extra: ¡Restamos el stock real de la base de datos!
                await client.query(
                    "UPDATE base_products SET stock = stock - $1 WHERE base_product_id = $2",
                    [item.quantity, item.product_id]
                );
            }

            await client.query("COMMIT"); // Si todo ha ido bien, guardamos de verdad
            console.log("¡Pedido guardado con éxito! ID del pedido:", orderId);
            return { id: orderId, status: 'pending' };

        } catch (error) {
            await client.query("ROLLBACK"); // Si algo explota, deshacemos todo
            console.error("🔥 EXPLOSIÓN EN EL DAO AL CREAR PEDIDO:", error);
            throw error;
        } finally {
            client.release();
        }
    }

    // Obtener todos los pedidos con el total calculado
    static async getAllOrders() {
        // 🔥 PARCHE CLAVE 2: Cambiamos a LEFT JOIN para que no se oculten pedidos por fallos de usuario
        const result = await pool.query(`
            SELECT 
                o.order_id, 
                o.order_date, 
                o.order_status, 
                u.first_name AS customer_name, 
                u.email,
                COALESCE(SUM(oi.unit_price * oi.quantity), 0) AS total
            FROM blueforge.orders o
            LEFT JOIN blueforge.users u ON o.user_id = u.user_id
            LEFT JOIN blueforge.order_items oi ON o.order_id = oi.order_id
            GROUP BY o.order_id, u.first_name, u.email
            ORDER BY o.order_date DESC
        `);
        return result.rows;
    }

    // Actualizar el estado de un pedido
    static async updateOrderStatus(orderId: number, status: string) {
        const result = await pool.query(
            "UPDATE blueforge.orders SET order_status = $1 WHERE order_id = $2 RETURNING *",
            [status, orderId]
        );
        return result.rows[0];
    }
}
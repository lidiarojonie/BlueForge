import { pool } from "../db.ts";

export class OrderDAO {
    static async createOrder(userId: number, items: any[], addressString: string) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); // Empezamos la transacción segura

            // 1. Guardamos la dirección. (Rellenamos los campos obligatorios de tu tabla 'addresses' con datos genéricos para que no explote por el string de React)
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
            const orderResult = await client.query(
                "INSERT INTO orders (order_date, order_status, payment_method, user_id, address_id) VALUES (NOW(), 'pending', 'card', $1, $2) RETURNING order_id",
                [userId, addressId]
            );
            const orderId = orderResult.rows[0].order_id;

            // 4. Metemos cada producto en 'order_items' y restamos el stock
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
            return { id: orderId, status: 'pending' };

        } catch (error) {
            await client.query("ROLLBACK"); // Si algo explota, deshacemos todo
            throw error;
        } finally {
            client.release();
        }
    }
}
import { pool } from "../db.ts";

export class ProductDAO {
    static async getAllProducts() {
        const result = await pool.query(`
            SELECT 
                p.base_product_id AS id, 
                p.name, 
                p.description, 
                p.base_price AS price, 
                p.product_image AS image_url, 
                p.stock, 
                p.active, 
                AVG(r.rating) AS average_rating
            FROM blueforge.base_products p
            LEFT JOIN blueforge.reviews r ON p.base_product_id = r.base_product_id
            WHERE p.active = TRUE
            GROUP BY p.base_product_id
            ORDER BY p.base_product_id ASC
        `);
        return result.rows;
    }

    static async getProductById(id: number) {
        const result = await pool.query(
            "SELECT base_product_id AS id, name, description, base_price AS price, product_image AS image_url, stock, active FROM base_products WHERE base_product_id = $1", 
            [id]
        );
        return result.rows[0];
    }
}
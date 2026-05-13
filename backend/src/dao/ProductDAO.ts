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

    static async getAllParts() {
        const result = await pool.query(`
            SELECT 
                customizable_part_id AS id, 
                category, 
                stock, 
                customization_price AS price, 
                color AS name, 
                part_image AS image_url, 
                base_product_id,
                active 
            FROM blueforge.customizable_parts
            ORDER BY category ASC, customizable_part_id ASC
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

    static async insertProduct(name: string, description: string, price: number, stock: number, imageUrl: string) {
        const result = await pool.query(
            "INSERT INTO base_products (name, description, base_price, stock, product_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, description, price, stock, imageUrl]
        );
        return result.rows[0];
    }

    static async insertPart(category: string, stock: number, price: number, color: string, imageUrl: string, baseProductId: number) {
        const result = await pool.query(
            "INSERT INTO customizable_parts (category, stock, customization_price, color, part_image, base_product_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [category, stock, price, color, imageUrl, baseProductId]
        );
        return result.rows[0];
    }

    static async updateProduct(id: number, name: string, description: string, price: number, stock: number, imageUrl: string) {
        await pool.query(
            "UPDATE base_products SET name = $1, description = $2, base_price = $3, stock = $4, product_image = $5 WHERE base_product_id = $6",
            [name, description, price, stock, imageUrl, id]
        );
    }

    static async updatePart(id: number, category: string, stock: number, price: number, color: string, imageUrl: string, baseProductId: number) {
        await pool.query(
            "UPDATE customizable_parts SET category = $1, stock = $2, customization_price = $3, color = $4, part_image = $5, base_product_id = $6 WHERE customizable_part_id = $7",
            [category, stock, price, color, imageUrl, baseProductId, id]
        );
    }

    static async deleteProduct(id: number) {
        await pool.query("DELETE FROM base_products WHERE base_product_id = $1", [id]);
    }

    static async deletePart(id: number) {
        await pool.query("DELETE FROM customizable_parts WHERE customizable_part_id = $1", [id]);
    }
}
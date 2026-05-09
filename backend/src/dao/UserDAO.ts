import { pool } from "../db.ts";

export class UserDAO {
    static async createUser(username: string, email: string, passwordHash: string, role: string) {
        // Ponemos 'Desconocido' en last_name para cumplir con tu restricción NN_users_last_name
        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id AS id, first_name AS username, email, role",
            [username, 'Desconocido', email, passwordHash, role]
        );
        return result.rows[0];
    }

    static async getUserByEmailOrName(identifier: string) {
        const result = await pool.query(
            "SELECT user_id AS id, first_name AS username, email, password_hash AS password, role FROM users WHERE email = $1 OR first_name = $2",
            [identifier, identifier]
        );
        return result.rows[0];
    }
}
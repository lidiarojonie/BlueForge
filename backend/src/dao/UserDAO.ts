import { pool } from "../db.ts";

export class UserDAO {
    static async createUser(firstName: string, lastName: string, phone: string, birthDate: string, email: string, passwordHash: string, role: string = 'customer') {
        const result = await pool.query(
            "INSERT INTO blueforge.users (first_name, last_name, phone_number, birth_date, email, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id AS id, first_name AS username, last_name, email, role, phone_number, birth_date",
            [firstName, lastName, phone, birthDate, email, passwordHash, role]
        );
        return result.rows[0];
    }

    static async getUserByEmailOrName(identifier: string) {
        const result = await pool.query(
            "SELECT user_id AS id, first_name AS username, email, password_hash AS password, role FROM blueforge.users WHERE email = $1 OR first_name = $2",
            [identifier, identifier]
        );
        return result.rows[0];
    }

    static async getAllUsers() {
        const result = await pool.query(
            "SELECT user_id AS id, first_name AS username, email, role FROM blueforge.users ORDER BY user_id ASC"
        );
        return result.rows;
    }

    static async updateUserRole(id: number, role: string) {
        const result = await pool.query(
            "UPDATE blueforge.users SET role = $1 WHERE user_id = $2",
            [role, id]
        );
        return result.rowCount;
    }

    static async getUserById(id: number) {
        const result = await pool.query(
            "SELECT user_id AS id, first_name AS firstName, last_name AS lastName, phone_number AS phone, birth_date AS birthDate, email, role FROM blueforge.users WHERE user_id = $1",
            [id]
        );
        return result.rows[0];
    }

    static async updateUserProfile(id: number, firstName: string, lastName: string, phone: string, birthDate: string, email: string, newPasswordHash?: string) {
        let query = "UPDATE blueforge.users SET first_name = $1, last_name = $2, phone_number = $3, birth_date = $4, email = $5";
        const params: any[] = [firstName, lastName, phone, birthDate, email];

        if (newPasswordHash) {
            query += ", password_hash = $6";
            params.push(newPasswordHash);
            query += ` WHERE user_id = $${params.length + 1}`;
            params.push(id);
        } else {
            query += ` WHERE user_id = $6`;
            params.push(id);
        }

        query += " RETURNING user_id AS id, first_name AS firstName, last_name AS lastName, phone_number AS phone, birth_date AS birthDate, email, role";

        const result = await pool.query(query, params);
        return result.rows[0];
    }
}
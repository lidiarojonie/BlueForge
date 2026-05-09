import { pool } from "../db.ts";

export class ClockDAO {
    static async isClockedIn(userId: number) {
        const result = await pool.query(
            "SELECT clock_type FROM clock_events WHERE user_id = $1 ORDER BY recorded_at DESC LIMIT 1",
            [userId]
        );
        return result.rows.length > 0 && result.rows[0].clock_type === "in";
    }

    static async insertClockEvent(userId: number, type: string, note: string) {
        await pool.query(
            "INSERT INTO clock_events (user_id, clock_type, incident, recorded_at) VALUES ($1, $2, $3, NOW())",
            [userId, type, note]
        );
    }
}
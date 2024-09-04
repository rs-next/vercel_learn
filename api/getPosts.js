import { createPool } from "@vercel/postgres";

export default async function handler(req, res) {
    // Pooled 클라이언트 생성
    const pool = createPool({
        connectionString: process.env.POSTGRES_URL, // 환경 변수를 사용
    });

    if (req.method === "GET") {
        try {
            const client = await pool.connect();
            const { rows } = await client.query(
                "SELECT * FROM posts ORDER BY created_at DESC"
            );
            res.status(200).json(rows);
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({
                error: "Failed to fetch posts",
                details: error.message,
            });
        } finally {
            await pool.end();
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

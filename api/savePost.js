import { createPool } from "@vercel/postgres";

export default async function handler(req, res) {
    const pool = createPool({
        connectionString: process.env.POSTGRES_URL,
    });

    if (req.method === "POST") {
        const { title, content, image } = req.body;

        try {
            const client = await pool.connect();
            const result = await client.query(
                `
                INSERT INTO posts (title, content, image)
                VALUES ($1, $2, $3)
                RETURNING *;
                `,
                [title, content, image]
            );

            const newPost = result.rows[0];
            res.status(200).json(newPost); // 새로 삽입된 게시물 데이터 반환
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({
                error: "Failed to create post",
                details: error.message,
            });
        } finally {
            await pool.end();
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

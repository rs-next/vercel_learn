import { createPool } from "@vercel/postgres";

export default async function handler(req, res) {
    const pool = createPool({
        connectionString: process.env.POSTGRES_URL,
    });

    if (req.method === "DELETE") {
        const { id } = req.body;

        try {
            const client = await pool.connect();
            await client.query("DELETE FROM posts WHERE id = $1", [id]);
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({
                error: "Failed to delete post",
                details: error.message,
            });
        } finally {
            await pool.end();
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

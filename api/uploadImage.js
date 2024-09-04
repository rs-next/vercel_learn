import { put } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { image, filename } = req.body; // 이미지 데이터와 파일 이름을 받아옵니다.

        try {
            // 이미지를 Vercel Blob에 업로드합니다.
            const { url } = await put(
                `images/${filename}`,
                Buffer.from(image, "base64"),
                {
                    access: "public",
                }
            );

            // 업로드된 이미지의 URL을 반환합니다.
            res.status(200).json({ url });
        } catch (error) {
            console.error("Error uploading image:", error);
            res.status(500).json({ error: "Failed to upload imagse" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

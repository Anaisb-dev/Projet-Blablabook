import "dotenv/config";
import fetch from "node-fetch";


export async function searchBooks(req, res) {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        const response = await fetch(
            `${process.env.GOOGLE_BOOKS_BASE_URL}/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        const books = data.items || [];

        // Ne garder que les infos essentielles
        const simplifiedBooks = books.slice(0, 5) // Limite de 5 livres max
        .map(book => {
        const info = book.volumeInfo;
        // Trouver le ISBN
        const isbn = info.industryIdentifiers?.find(id => id.type === "ISBN_13");
         // Extraire l'année
        const year = info.publishedDate ? parseInt(info.publishedDate.slice(0, 4)) : null;

        return {
        code_isbn: isbn,
        title: info.title,
        year: year,
        summary: info.description || "Pas de description",
        page_number: info.pageCount || 0, // 0 si inconnu
        cover_image: info.imageLinks?.thumbnail || null,
    };
});

        res.json(simplifiedBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur API Google Books" });
    }
}



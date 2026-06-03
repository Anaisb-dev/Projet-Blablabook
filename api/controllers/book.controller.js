import { StatusCodes } from "http-status-codes";

// Rechercher des livres via l'API Google Books
export async function searchBooks(req, res) {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Query is required" });
        }

        const response = await fetch(
            `${process.env.GOOGLE_BOOKS_BASE_URL}/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );

                console.log("réponse", response);
        const data = await response.json();
        const books = data.items || [];



        // Ne garder que les infos essentielles
        const simplifiedBooks = books.slice(0, 10) // Limite de 10 livres max
        .map(book => {
        const info = book.volumeInfo;
        // Trouver le ISBN
        const isbnObj = info.industryIdentifiers?.find(id => id.type === "ISBN_13");
        const isbn = isbnObj ? isbnObj.identifier : book.id;
         // Extraire l'année
        const year = info.publishedDate ? parseInt(info.publishedDate.slice(0, 4)) : null;
    
        return {
        google_book_id: book.id,
        code_isbn: isbn,
        title: info.title,
        year: year,
        summary: info.description || "Pas de description",
        page_number: info.pageCount || 0, // 0 si inconnu
        cover_image: info.imageLinks?.thumbnail || null,
        genres: info.categories || [],
        authors: info.authors || []
    };
});

    res.json(simplifiedBooks);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur API Google Books" });
    }
}

// GET /books/:id
export async function getBookById(req, res) {
    try {
        const { id } = req.params;

        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({ error: "Book ID is required" });

        const response = await fetch(
            `${process.env.GOOGLE_BOOKS_BASE_URL}/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );
        
        const data = await response.json();
        const info = data.volumeInfo || {};

       // Vérifie que industryIdentifiers existe avant de prendre l'ISBN
        const isbn = info.industryIdentifiers?.[0]?.identifier || null;

        const year = info.publishedDate ? parseInt(info.publishedDate.slice(0, 4)) : null;

        const bookDetail = {
            google_book_id: data.id,
            code_isbn: isbn,
            title: info.title,
            year: year,
            summary: info.description || "Pas de description",
            page_number: info.pageCount || 0,
            cover_image: info.imageLinks?.thumbnail || null,
            authors: info.authors || [],
            genres: info.categories || [],
        };
        
        res.json(bookDetail);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la récupération du livre" });
    }
}



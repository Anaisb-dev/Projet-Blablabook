// Constantes HTTP pour les codes de réponse (400, 500, etc.)
import { StatusCodes } from "http-status-codes";


// RECHERCHE DE LIVRES — GET /api/books/search?query=...
// Interroge l'API Google Books avec le mot-clé de l'utilisateur
// et retourne une liste simplifiée de 10 livres maximum

export async function searchBooks(req, res) {
    try {
        // On récupère le paramètre "query" dans l'URL
        // Exemple : /api/books/search?query=harry+potter
        const { query } = req.query;

        // Si aucun mot-clé n'est fourni → erreur 400
        if (!query) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Query is required" });
        }

        // Appel à l'API Google Books avec le mot-clé et la clé API
        const response = await fetch(
            `${process.env.GOOGLE_BOOKS_BASE_URL}/volumes?q=${query}&langRestrict=fr&key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();

        // Si Google Books ne retourne rien, on utilise un tableau vide
        const books = data.items || [];

        // On simplifie et formate les données retournées par Google Books
        // pour ne garder que ce dont l'application a besoin
        const simplifiedBooks = books
            .slice(0, 10) // On limite à 10 résultats maximum
            .map(book => {
                const info = book.volumeInfo;

                // On cherche l'ISBN-13 du livre parmi les identifiants disponibles
                // Si pas d'ISBN-13, on utilise l'ID Google Books comme identifiant de secours
                const isbnObj = info.industryIdentifiers?.find(id => id.type === "ISBN_13");
                const isbn = isbnObj ? isbnObj.identifier : book.id;

                // Pour la couverture : on privilégie Open Library (meilleure qualité)
                // Si pas d'ISBN disponible, on utilise la miniature Google Books en fallback
                const coverImage = info.imageLinks?.thumbnail || null;

                // On extrait uniquement l'année depuis la date de publication
                // Exemple : "2005-03-17" → 2005
                const year = info.publishedDate ? parseInt(info.publishedDate.slice(0, 4)) : null;

                // On retourne un objet propre avec uniquement les données utiles
                return {
                    google_book_id: book.id,
                    code_isbn: isbn,
                    title: info.title,
                    year: year,
                    summary: info.description || "Pas de description",
                    page_number: info.pageCount || 0, // 0 si le nombre de pages est inconnu
                    // Remplace la ligne cover_image par :
                    cover_image: info.imageLinks?.thumbnail || null,
                    genres: info.categories || [],    // Tableau vide si aucun genre
                    authors: info.authors || []       // Tableau vide si aucun auteur
                };
            });

        // On retourne la liste formatée au frontend
        res.json(simplifiedBooks);

    } catch (error) {
        // En cas d'erreur inattendue (réseau, API indisponible...) → erreur 500
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur API Google Books" });
    }
}



// DÉTAIL D'UN LIVRE — GET /api/books/:id
// Récupère les informations complètes d'un livre
// depuis Google Books via son identifiant unique

export async function getBookById(req, res) {
    try {
        // On récupère l'id Google Books depuis l'URL
        // Exemple : /api/books/wrOQLV6xB-wC
        const { id } = req.params;

        // Si pas d'id fourni → erreur 400
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({ error: "Book ID is required" });

        // Appel à l'API Google Books pour récupérer les détails du livre
        const response = await fetch(
            `${process.env.GOOGLE_BOOKS_BASE_URL}/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );

        const data = await response.json();
        const info = data.volumeInfo || {};

        // On prend le premier ISBN disponible
        // Le ?. (optional chaining) évite une erreur si industryIdentifiers est undefined
        const isbn = info.industryIdentifiers?.[0]?.identifier || null;

        // Extraction de l'année depuis la date de publication
        const year = info.publishedDate ? parseInt(info.publishedDate.slice(0, 4)) : null;

        // On formate les données du livre pour le frontend
        const bookDetail = {
            google_book_id: data.id,
            code_isbn: isbn,
            title: info.title,
            year: year,
            summary: info.description || "Pas de description",
            page_number: info.pageCount || 0,
            // Même logique que searchBooks : Open Library en priorité, Google Books en fallback
            cover_image: isbn
                ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
                : info.imageLinks?.thumbnail || null,
            authors: info.authors || [],
            genres: info.categories || [],
        };

        // On retourne le détail du livre au frontend
        res.json(bookDetail);

    } catch (error) {
        // Erreur inattendue → 500
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la récupération du livre" });
    }
}
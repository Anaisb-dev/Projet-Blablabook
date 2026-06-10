// Service de communication avec l'API back-end BlablaBook
// Chaque fonction correspond à un endpoint de l'API REST
import api from "../src/lib/api";


// ============================================================
// RECHERCHE DE LIVRES — GET /api/books/search?query=...
// Envoie le mot-clé au back-end qui interroge Google Books
// ============================================================
export const searchBooks = async (query) => {
    try {
        return await api(`/api/books/search?query=${encodeURIComponent(query)}`, "GET");
    } catch (err) {
        console.error(`Erreur recherche "${query}" :`, err);
        return []; // Retourne un tableau vide en cas d'échec
    }
};


// ============================================================
// LIVRES ALÉATOIRES — Utilisés sur la homepage
// Sélectionne 3 mots-clés au hasard, lance 3 recherches
// en parallèle, filtre et mélange les résultats
// ============================================================
export const getRandomBooks = async () => {

    // Mots-clés en français pour favoriser les livres francophones
    const keywords = [
        "amour", "romance", "développement personnel",
        "thriller", "fantasy", "cuisine",
        "aventure", "bien-être", "mangas",
        "policier", "jeunesse", "bandes-dessinées"
    ];

    // Algorithme de mélange Fisher-Yates (plus fiable que Math.random() - 0.5)
    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // On sélectionne 3 mots-clés aléatoires
    const selectedKeywords = shuffle(keywords).slice(0, 3);

    // On lance les 3 recherches en parallèle pour gagner du temps
    // Promise.all attend que toutes les promesses soient résolues
    const results = await Promise.all(
        selectedKeywords.map(keyword => searchBooks(keyword))
    );

    // On fusionne les 3 tableaux de résultats en un seul
    const allBooks = results.flat();

    // On filtre pour ne garder que les livres publiés après 2000
    let filtered = allBooks.filter(book => book.year && book.year >= 2000);

    // Si moins de 10 livres récents, on prend tous les résultats
    if (filtered.length < 10) {
        filtered = allBooks;
    }

    // On mélange et on limite à 20 livres maximum
    return shuffle(filtered).slice(0, 20);
};


// ============================================================
// DÉTAIL D'UN LIVRE — GET /api/books/:googleBookId
// Récupère les informations complètes d'un livre
// ============================================================
export const getBookDetail = async (googleBookId) => {
    return await api(`/api/books/${googleBookId}`, "GET");
};


// ============================================================
// BIBLIOTHÈQUE PERSONNELLE
// ============================================================

// Ajouter un livre à la bibliothèque avec un statut par défaut "à lire"
export const addBookToPersonalLibrary = async (googleBookId, status = "à lire") => {
    return await api(`/api/users/books/${googleBookId}`, "POST", { status });
};

// Supprimer un livre de la bibliothèque personnelle
export const deleteBookFromPersonalLibrary = async (id) => {
    return await api(`/api/users/books/${id}`, "DELETE");
};

// Récupérer le détail d'un livre dans la bibliothèque personnelle
export const getUserBookDetail = async (id) => {
    return await api(`/api/users/books/${id}`, "GET");
};

// Mettre à jour le statut de lecture d'un livre
// Valeurs possibles : "à lire", "en cours", "lu"
export async function updateBookStatus(id, status) {
    return await api(`/api/users/books/${id}`, "PATCH", { status });
}
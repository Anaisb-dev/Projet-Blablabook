import api from "../src/lib/api"; // On importe la fonction pour appeler le backend

// On exporte les founctions pour pouvoir les utiliser dans le frontend
// Fonction pour rechercher des livres
export const searchBooks = async (query) => {
    return await api(`/api/books/search?query=${query}`, "GET");
};

//Fonction pour récupérer des livres aléatoires
export const getRandomBooks = async () => {
    const keywords = [
        "amour",
        "romance",
        "developpement personnel",
        "thriller",
        "fantasy",
        "cuisine",
        "aventure",
        "bien-être",
        "mangas",
        "policier",
        "jeunesse",
        "bandes-dessinées"
    ];

    // 3 catégories aléatoires
    const shuffledKeywords = [...keywords].sort(() => 0.5 - Math.random());
    const selectedKeywords = shuffledKeywords.slice(0, 3);

    // Récupérer les livres
    const results = await Promise.all(
        selectedKeywords.map(keyword => searchBooks(keyword))
    );

    const allBooks = results.flat();

    // Filtre date (>= 2000)
    let filtered = allBooks.filter(book => book.year && book.year >= 2000);

// 🔹 Log après filtrage
    console.log("Livres filtrés (year >= 2000) :");
    filtered.forEach(book => {
        console.log(`Titre: ${book.title} | Year: ${book.year}`);
    });

    // si trop peu de livres récents
    if (filtered.length < 10) {
        filtered = allBooks;
    }

    // Mélange aléatoire
    const shuffledBooks = filtered.sort(() => 0.5 - Math.random());
    return shuffledBooks.slice(0, 20);
};

export const getBookDetail = async (googleBookId) => {
    return await api(`/api/books/${googleBookId}`, "GET");
};

// Ajouter un livre Google à la bibliothèque
export const addBookToPersonalLibrary = async (googleBookId, status = "à lire") => {
    return await api(`/api/users/books/${googleBookId}`, "POST", { status });
};
// Supprimer un livre de la bibliothèque personnelle
export const deleteBookFromPersonalLibrary = async (id) => {
    return await api(`/api/users/books/${id}`, "DELETE");
};

export const getUserBookDetail = async (id) => {
    return await api(`/api/users/books/${id}`, "GET");
};
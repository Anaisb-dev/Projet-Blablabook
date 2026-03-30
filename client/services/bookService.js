import api from "../src/lib/api"; // On importe la fonction pour appeler le backend

// On exporte les founctions pour pouvoir les utiliser dans le frontend
// Fonction pour rechercher des livres
export const searchBooks = async (query) => {
    return await api(`/books/search?query=${query}`, "GET");
};

// Fonction pour récupérer des livres aléatoires
export const getRandomBooks = async () => {
    const keywords = ["amour", "thriller", "fantasy", "cuisine", "aventure", "bien-être"];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    return await searchBooks(randomKeyword);
};

export const getBookDetail = async (id) => {
    return await api(`/books/${id}`, "GET");
};

// Ajouter un livre Google à la bibliothèque
export const addBookToPersonalLibrary = async (googleBookId, status = "à lire") => {
    console.log("IMAGE LINKS:", googleBook.volumeInfo.imageLinks);
    return await api(`/users/books/${googleBookId}`, "POST", { status });
};
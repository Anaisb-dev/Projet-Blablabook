import { StatusCodes } from "http-status-codes";
import { User, UserBook, Book, Author } from "../models/index.js";


// Fonction test pour afficher tous les users
export async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();

        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Afficher le profil de l'utilisateur connecté
export async function getProfile(req, res) {
    try {
        const user = await User.findByPk(req.user.id, {
    attributes: ["id", "username", "email"] // info à afficher
});
        res.json(user);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}

// Afficher les infos perso de l'utilisateur connecté
export async function getSettings(req, res) {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}

// Modifier les infos perso de l'utilisateur connecté
export async function updateSettings(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        await user.update(req.body);

        res.json(user);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}

// Afficher tous les livres de l'utilisateur connecté
export async function getUserBooks(req, res) {
    try {
        const books = await UserBook.findAll({
            where: { user_id: req.user.id },
            attributes: ["status"], // on garde l'attribut status de UserBook
            include: [{
                model: Book,
                as: "book",
                attributes: ["id", "title", "summary", "cover_image"] // on garde seulement ces attributs du livre
            }]
        });

        const result = books.map(b => ({
            status: b.status,
            ...b.book.toJSON()
        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Récupérer un livre de l'utilisateur via son id
export async function getUserBookById(req, res) {
    try {
        const { id } = req.params;

        const userBook = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            },
            attributes: ["status"],
            include: [{
                model: Book,
                as: "book",
                attributes: ["id", "title", "summary", "cover_image"], // on affiche seulement ces attributs du livre
                include: [{
                    model: Author,
                    as: "authors",
                    attributes: ["last_name", "first_name"], // adapte selon ton modèle
                    through: { attributes: [] } //  supprime le bloc book_author
                }]
            }]
        });

        if (!userBook) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Livre non trouvé dans ta bibliothèque" });
        }

//         const result = {
//     status: userBook.status,
//     id: userBook.book.id,
//     title: userBook.book.title,
//     summary: userBook.book.summary,
//     cover_image: userBook.book.cover_image,
//     google_book_id: userBook.book.google_book_id, // <--- ajouter ça !
//     authors: userBook.book.authors // si tu veux
// };
    const result = {
            status: userBook.status,
            ...userBook.book.toJSON()
        };

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}


// Modifier le statut d'un livre présent dans notre compte
export async function updateUserBook(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const userBook = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            }
        });

        if (!userBook) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Livre non trouvé" });
        }

        await userBook.update({ status });

        res.json(userBook);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}


 // Ajouter un livre Google à la bibliothèque privée de l'utilisateur connecté

export async function addGoogleBookToLibrary(req, res) {
    try {
        
        const googleBookId = req.params.googleBookId; // depuis l'URL (via page détail bibliothèque publique)
        const { status = "à lire" } = req.body;
        const userId = req.user.id;
        console.log("User:", req.user);
        console.log("GoogleBookId:", req.params.googleBookId);
        if (!googleBookId) {
            return res.status(400).json({ error: "L'id du livre Google est requis" });
        }

        // Récupère les infos depuis Google Books
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${googleBookId}`);
        const googleBook = await response.json();

        if (!googleBook || !googleBook.volumeInfo) {
            return res.status(404).json({ error: "Livre introuvable via Google Books" });
        }

        // On récupère l'ISBN principal du livre si disponible, sinon on prend l'ID Google Books comme identifiant unique
        const isbn = googleBook.volumeInfo.industryIdentifiers?.[0]?.identifier || googleBook.id;

        // Cherche d'abord par Google Book ID
        let book = await Book.findOne({ where: { google_book_id: googleBook.id } });

        // puis on cherche par ISBN
        if (!book) {
            book = await Book.findOne({ where: { code_isbn: isbn } });
        }

        // Si toujours pas trouvé, on crée le livre
        if (!book) {
            book = await Book.create({
                title: googleBook.volumeInfo.title,
                summary: googleBook.volumeInfo.description || "",
                year: googleBook.volumeInfo.publishedDate?.split("-")[0] || null,
                page_number: googleBook.volumeInfo.pageCount || null,
                cover_image: googleBook.volumeInfo.imageLinks?.thumbnail || null,
                google_book_id: googleBook.id || null,
                code_isbn: isbn,
            });
        } else {
            // Si le livre existe mais que google_book_id est null, on l'ajoute
            if (!book.google_book_id) {
                book.google_book_id = googleBook.id;
                await book.save();
            }
        }

        // Associe les auteurs
        if (googleBook.volumeInfo.authors?.length) {
            for (const authorName of googleBook.volumeInfo.authors) {
                const [firstName, ...rest] = authorName.split(" ");
                const lastName = rest.join(" ");
                const [author] = await Author.findOrCreate({
                    where: { first_name: firstName, last_name: lastName }
                });
                await book.addAuthor(author);
            }
        }

        // Ajoute le livre à la bibliothèque de l'utilisateur
        await UserBook.findOrCreate({
            where: { user_id: userId, book_id: book.id },
            defaults: { status }
        });

        res.status(201).json({ message: "Livre ajouté à la bibliothèque", book });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Supprimer un livre de sa bibliothèque
export async function deleteUserBook(req, res) {
    try {
        const { id } = req.params;

        const userBook = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            }
        });

        if (!userBook) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Livre non trouvé" });
        }

        await userBook.destroy();

        res.json({ message: "Livre supprimé de ta bibliothèque" });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}
import { StatusCodes } from "http-status-codes";
import { User, UserBook, Book, Author } from "../models/index.js";


export function fakeAuth(req, res, next) {
    // Simulation d'utilisateur connecté (Chloé)
    req.user = {
        id: 1,
        username: "Chloé",
        email: "chloe@test.com"
    };
    next();
}

// Afficher le profil de l'utilisateur connecté
export async function getProfile(req, res) {
    try {
        res.json(req.user);
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
import { StatusCodes } from "http-status-codes";
import { User, UserBook, Book } from "../models/index.js";


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
            include: [{ model: Book, as: "book" }]
        });
        
console.log("req.user:", req.user);
const test = await UserBook.findAll();
console.log("UserBook.findAll():", test);
        res.json(books);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
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
            include: ["book"] // relation Sequelize
        });

        if (!userBook) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Livre non trouvé dans ta bibliothèque" });
        }

        res.json(userBook);
    } catch (err) {
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
// Codes de statut HTTP (200, 404, 500, etc.)
import { StatusCodes } from "http-status-codes";
// Modèles Sequelize utilisés dans ce controller
import { User, UserBook, Book, Author } from "../models/index.js";
// Argon2 : librairie de hashage des mots de passe
import argon2 from "argon2";



// PROFIL UTILISATEUR — GET /api/users/profile
// Retourne les informations de base de l'utilisateur connecté

export async function getProfile(req, res) {
    try {
        // req.user.id est injecté par le middleware JWT authenticate
        // On ne retourne que les infos non sensibles (pas le mot de passe)
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "username", "email"]
        });
        res.json(user);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}



// PARAMÈTRES — GET /api/users/settings
// Retourne toutes les infos de l'utilisateur connecté
// (pour pré-remplir le formulaire de paramètres)

export async function getSettings(req, res) {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}



// MODIFIER LES INFOS — PUT /api/users/settings
// Met à jour les informations personnelles de l'utilisateur

export async function updateSettings(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        // user.update() met à jour uniquement les champs envoyés dans req.body
        await user.update(req.body);

        res.json(user);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}



// MODIFIER LE MOT DE PASSE — PATCH /api/users/password
// Hash le nouveau mot de passe avant de le sauvegarder
// Le mot de passe ne doit JAMAIS être stocké en clair

export async function updatePassword(req, res) {
    try {
        const user = await User.findByPk(req.user.id);
        const { password } = req.body;

        // Vérification que le champ password est bien présent
        if (!password) {
            return res.status(400).json({ error: "Mot de passe requis" });
        }

        // On hash le nouveau mot de passe avec Argon2 avant stockage
        const hashedPassword = await argon2.hash(password);

        // On met à jour uniquement le mot de passe, pas les autres champs
        await user.update({ password: hashedPassword });

        res.json({ message: "Mot de passe mis à jour" });

    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}



// BIBLIOTHÈQUE PERSONNELLE — GET /api/users/books
// Retourne tous les livres de la bibliothèque de l'utilisateur
// avec leur statut de lecture (à lire, en cours, lu)

export async function getUserBooks(req, res) {
    try {
        // On cherche toutes les entrées UserBook de l'utilisateur connecté
        // et on y inclut les infos du livre associé (jointure SQL)
        const books = await UserBook.findAll({
            where: { user_id: req.user.id },
            attributes: ["status"],
            include: [{
                model: Book,
                as: "book",
                attributes: ["id", "title", "google_book_id", "summary", "cover_image"]
            }]
        });

        // On aplatit le résultat pour retourner un tableau propre
        // { status: "lu", id: 1, title: "...", ... }
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



// DÉTAIL D'UN LIVRE — GET /api/users/books/:id
// Retourne les détails d'un livre spécifique de la bibliothèque
// avec ses auteurs

export async function getUserBookById(req, res) {
    try {
        const { id } = req.params;

        const userBook = await UserBook.findOne({
            where: {
                user_id: req.user.id, // Sécurité : on vérifie que le livre appartient bien à cet utilisateur
                book_id: id
            },
            attributes: ["status"],
            include: [{
                model: Book,
                as: "book",
                attributes: ["id", "title", "summary", "cover_image"],
                include: [{
                    model: Author,
                    as: "authors",
                    attributes: ["last_name", "first_name"],
                    through: { attributes: [] } // On exclut les colonnes de la table de liaison book_author
                }]
            }]
        });

        // Si le livre n'est pas dans la bibliothèque de l'utilisateur → 404
        if (!userBook) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Livre non trouvé dans ta bibliothèque" });
        }

        // On formate la réponse en fusionnant le statut et les infos du livre
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



// MODIFIER LE STATUT — PATCH /api/users/books/:id
// Met à jour le statut de lecture d'un livre
// (à lire → en cours → lu)

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

        // Si le livre n'existe pas dans la bibliothèque → 404
        if (!userBook) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Livre non trouvé" });
        }

        // On met à jour uniquement le statut
        await userBook.update({ status });

        res.json(userBook);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}



// AJOUTER UN LIVRE — POST /api/users/books/:googleBookId
// Récupère les infos depuis Google Books, sauvegarde le livre
// en BDD si nécessaire, puis l'associe à l'utilisateur

export async function addGoogleBookToLibrary(req, res) {
    try {
        // L'id Google Books vient de l'URL
        const googleBookId = req.params.googleBookId;
        // Statut par défaut si non précisé dans le body
        const { status = "à lire" } = req.body;
        const userId = req.user.id;

        if (!googleBookId) {
            return res.status(400).json({ error: "L'id du livre Google est requis" });
        }

        // Étape 1 : on récupère les informations du livre depuis l'API Google Books
        const response = await fetch(
            `${process.env.GOOGLE_BOOKS_BASE_URL}/volumes/${googleBookId}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );
        const googleBook = await response.json();

        if (!googleBook || !googleBook.volumeInfo) {
            return res.status(404).json({ error: "Livre introuvable via Google Books" });
        }

        // On récupère l'ISBN, ou l'ID Google Books si pas d'ISBN disponible
        const isbn = googleBook.volumeInfo.industryIdentifiers?.[0]?.identifier || googleBook.id;

        // Étape 2 : on vérifie si le livre existe déjà en BDD
        // pour éviter les doublons (cherche d'abord par google_book_id puis par ISBN)
        let book = await Book.findOne({ where: { google_book_id: googleBook.id } });
        if (!book) {
            book = await Book.findOne({ where: { code_isbn: isbn } });
        }

        // Étape 3 : si le livre n'existe pas encore en BDD, on le crée
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
            // Si le livre existe mais sans google_book_id, on le complète
            if (!book.google_book_id) {
                book.google_book_id = googleBook.id;
                await book.save();
            }
        }

        // Étape 4 : on associe les auteurs au livre
        // findOrCreate évite les doublons si l'auteur existe déjà en BDD
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

        // Étape 5 : on ajoute le livre à la bibliothèque de l'utilisateur
        // findOrCreate évite d'ajouter le même livre deux fois
        await UserBook.findOrCreate({
            where: { user_id: userId, book_id: book.id },
            defaults: { status }
        });

        // Réponse 201 Created avec le livre créé/trouvé
        res.status(201).json({ message: "Livre ajouté à la bibliothèque", book });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
}



// SUPPRIMER UN LIVRE — DELETE /api/users/books/:id
// Supprime un livre de la bibliothèque personnelle
// (supprime uniquement la liaison UserBook, pas le livre lui-même)

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

        // destroy() supprime l'entrée en BDD
        await userBook.destroy();

        res.json({ message: "Livre supprimé de ta bibliothèque" });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
    }
}



// SUPPRIMER LE COMPTE — DELETE /api/users/account
// Supprime définitivement le compte de l'utilisateur connecté
// ainsi que toutes ses données associées (cascade BDD)

export async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Utilisateur introuvable"
            });
        }

        // Suppression définitive de l'utilisateur en BDD
        await user.destroy();

        return res.status(StatusCodes.OK).json({
            message: "Compte supprimé avec succès"
        });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Erreur serveur"
        });
    }
}
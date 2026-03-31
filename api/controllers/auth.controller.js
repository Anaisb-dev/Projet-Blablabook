import "dotenv/config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import { Op } from "sequelize";
import { sendVerificationEmail } from "../services/mailer.js";


// FONCTION INSCRIPTION -

export async function registerUser(req, res) {
    // fonction pour l'inscription d'un utilisateur
    try {
        const { username, last_name, first_name, email, password } = req.body;
        // Cette variable récupére tous les élements pour le req.body, on appelle ça la "destructuration d’objet".

        const hashedPassword = await argon2.hash(password);
        // Stockage du password hasher via Argon2 dans une variable

        const userCreate = await User.create({
            username,
            last_name,
            first_name,
            email,
            password: hashedPassword,
        });

        // Génère un token pour le login, valable 7 jours
        const token = jwt.sign(
            { id: userCreate.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Génére un token pour le mail de confirmation valable 1h
        const emailToken = jwt.sign(
            { userId: userCreate.id, type: "email_verification" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const link = `http://localhost:5173/#/confirm?token=${emailToken}`;

        await sendVerificationEmail(userCreate.email, link);

        // Retourne le statut compte créé mais a valider via envoie d'un email
        res.status(StatusCodes.CREATED).json({
            message: "Compte créé. Vérifie ton email pour activer ton compte"
        });

    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            const field = error.errors?.[0]?.path || "champ inconnu";
            return res.status(StatusCodes.CONFLICT).json({
                error: `Ce contenu existe déjà : ${field}`,
            });
        }

        if (error.details) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Validation failed",
                details: error.details,
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erreur serveur" });
    }
}


export async function loginUser(req, res) {
    // fonction pour la connexion d'un utilisateur apres inscription
    const user = await User.findOne({
        where: {
            [Op.or]: [
                // [Op.or] est une logique Sequelize qui permet de faire OU et d'instaurer plusieurs conditions,
                // dans notre cas il créer un tableau avec comme choix, soit de trouver :
                // username OU l'email
                { username: req.body.identifier },
                { email: req.body.identifier }
                // On utilise .identifier comme "générique"
            ]
        }
    });

    if (!user || !await argon2.verify(user.password, req.body.password)) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            { message: "Identifiant ou mot de passe invalide." });
    }
    // Si l'utilisateur n'existe pas OU que le mot de passe est incorrect, on retourne un statut "Non authorisé"

    if (!user.is_verified) {
        return res.status(StatusCodes.FORBIDDEN).json(
            { message: "Veuillez valider votre compte avant de pouvoir vous connecter." }
        );
    } // On vérifie que l'user à bien confirmer son inscription (cliqué sur le mail de confirmation)

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
        // on créée une variable pour stocker un token générer à la connexion, il utilise l'id, il expire toutes les 2h
    );

    // renvoie token + user pour le frontend
    res.status(StatusCodes.OK).json({
        jwt: token,           // le token
        user: {
            id: user.id,
            username: user.username,
            email: user.email
            // ajoute d'autres infos si tu veux
        }
    });
}
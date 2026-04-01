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

        // Génére un token pour le mail de confirmation valable 1h
        const emailToken = jwt.sign(
            { userId: userCreate.id, type: "email_verification" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const link = `http://localhost:5173/#/confirm?token=${emailToken}`;
        // Lien retourner par email pour valider le compte, il contient le "emailToken" créé plus haut

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


export async function confirmEmail(req, res) {
    const { token } = req.query;

    if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Authentifacion échouée." });
        // On vérifie la présence d'un token, si ok on passe à try sinon : erreur 400
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // On vérifie que le token présent dans la requete correspond
        console.log(decoded);

        if (decoded.type !== "email_verification") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Authentifacion échouée." });
            // Si il ne correspond pas au type de "emailToken" plus haut : erreur 400
        }

        const user = await User.findByPk(decoded.userId);
        // On cherche l'utilisateur par son id
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Utilisateur introuvable." });
        }   // Si l'id de l'user ne correspond pas : erreur 400

        if (user.is_verified) {
            return res.status(StatusCodes.ACCEPTED).json({ message: "Compte déjà confirmé !" });
        }   // Si le statut de l'user est déjà vérifié alors on lui retourne ce message
        
        user.is_verified = true;
        // Sinon on passe son statut en true pour valider le compte

        await user.save();
        // On sauvegarde le statut de l'utilisateur en bdd pour s'assurer que le compte est validé

        return res.status(StatusCodes.ACCEPTED).json({ message: "Compte validé avec succés !" });
        // Retourne un message pour confirmer la validation du compte

    } catch (error) {
        console.error("Erreur confirmé", error);

        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Authentification expiré ou invalide." });
    }
};


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
        // on créée une variable pour stocker un token générer à la connexion, il utilise l'id, il expire toutes les 7jours
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
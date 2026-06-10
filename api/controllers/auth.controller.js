// Chargement des variables d'environnement (.env)
import "dotenv/config";
// Argon2 : hashage sécurisé des mots de passe
import argon2 from "argon2";
// JWT : création et vérification des tokens d'authentification
import jwt from "jsonwebtoken";
// Codes de statut HTTP (200, 201, 400, 401, etc.)
import { StatusCodes } from "http-status-codes";
// Modèle User pour interagir avec la table users en BDD
import { User } from "../models/index.js";
// Op : opérateurs Sequelize (ici utilisé pour le OR)
import { Op } from "sequelize";
// Service d'envoi d'email de confirmation via Resend
import { sendVerificationEmail } from "../services/mailer.js";



// INSCRIPTION — POST /api/auth/register
// Crée un nouveau compte utilisateur et envoie
// un email de confirmation avant toute connexion

export async function registerUser(req, res) {
    try {
        // Destructuration : on extrait les champs utiles du body de la requête
        const { username, email, password } = req.body;

        // On hash le mot de passe avec Argon2 avant de le stocker
        // Le mot de passe en clair ne sera JAMAIS enregistré en BDD
        const hashedPassword = await argon2.hash(password);

        // Création de l'utilisateur en base de données
        // is_verified est false par défaut (voir le modèle User)
        const userCreate = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Génération d'un token JWT spécifique à la vérification d'email
        // Ce token contient l'id de l'utilisateur et expire dans 1 heure
        const emailToken = jwt.sign(
            { userId: userCreate.id, type: "email_verification" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Construction du lien de confirmation envoyé par email
        // Ce lien pointe vers le frontend avec le token en paramètre
        const link = `${process.env.FRONTEND_URL}/#/confirm?token=${emailToken}`;

        // Envoi de l'email de confirmation via Resend
        await sendVerificationEmail(userCreate.email, link);

        // Réponse 201 : compte créé mais pas encore activé
        res.status(StatusCodes.CREATED).json({
            message: "Compte créé. Vérifie ton email pour activer ton compte"
        });

    } catch (error) {
        console.error(error);

        // Si l'username ou l'email existe déjà en BDD → erreur 409 Conflict
        if (error.name === "SequelizeUniqueConstraintError") {
            const field = error.errors?.[0]?.path || "champ inconnu";
            return res.status(StatusCodes.CONFLICT).json({
                error: `Ce contenu existe déjà : ${field}`,
            });
        }

        // Si les données envoyées sont invalides → erreur 400
        if (error.details) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Validation failed",
                details: error.details,
            });
        }

        // Toute autre erreur inattendue → erreur 500
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erreur serveur" });
    }
}



// CONFIRMATION D'EMAIL — GET /api/auth/confirm?token=...
// Vérifie le token reçu par email et active le compte
// L'utilisateur clique sur le lien → cette fonction est appelée

export async function confirmEmail(req, res) {

    // On récupère le token depuis les paramètres de l'URL
    const { token } = req.query;

    // Si aucun token n'est présent → erreur 400
    if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Authentification échouée." });
    }

    try {
        // jwt.verify() vérifie la signature ET l'expiration du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // On vérifie que c'est bien un token de vérification d'email
        // (pas un token de connexion utilisé par erreur)
        if (decoded.type !== "email_verification") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Authentification échouée." });
        }

        // On recherche l'utilisateur correspondant à l'id contenu dans le token
        const user = await User.findByPk(decoded.userId);

        // Si l'utilisateur n'existe pas → erreur 400
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Utilisateur introuvable." });
        }

        // Si le compte est déjà confirmé, on informe l'utilisateur sans erreur
        if (user.is_verified) {
            return res.status(StatusCodes.ACCEPTED).json({ message: "Compte déjà confirmé !" });
        }

        // On passe is_verified à true pour activer le compte
        user.is_verified = true;

        // On sauvegarde le changement en base de données
        await user.save();

        // Confirmation réussie → le compte est maintenant actif
        return res.status(StatusCodes.ACCEPTED).json({ message: "Compte validé avec succès !" });

    } catch (error) {
        console.error("Erreur confirmation", error);
        // Token invalide ou expiré (après 1h) → erreur 400
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Authentification expirée ou invalide." });
    }
};


// CONNEXION — POST /api/auth/login
// Vérifie les identifiants de l'utilisateur et retourne
// un token JWT si tout est correct

export async function loginUser(req, res) {

    // On cherche l'utilisateur par username OU par email
    // Op.or permet d'indiquer à Sequelize de chercher l'un OU l'autre
    // L'utilisateur peut donc se connecter avec son pseudo ou son email
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { username: req.body.identifier },
                { email: req.body.identifier }
            ]
        }
    });

    // Si l'utilisateur n'existe pas OU si le mot de passe est incorrect
    // argon2.verify() compare le mot de passe saisi avec le hash stocké en BDD
    // On retourne volontairement le même message pour ne pas indiquer
    // si c'est l'identifiant ou le mot de passe qui est incorrect (sécurité)
    if (!user || !await argon2.verify(user.password, req.body.password)) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            { message: "Identifiant ou mot de passe invalide." }
        );
    }

    // Si le compte n'a pas été confirmé par email → erreur 403 Forbidden
    // L'utilisateur doit d'abord cliquer sur le lien de confirmation
    if (!user.is_verified) {
        return res.status(StatusCodes.FORBIDDEN).json(
            { message: "Veuillez valider votre compte avant de pouvoir vous connecter." }
        );
    }

    // Tout est OK → on génère un token JWT de connexion
    // Ce token contient l'id de l'utilisateur et expire dans 2 heures
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    // On retourne le token et les infos de base de l'utilisateur au frontend
    // Le frontend stockera le token pour l'envoyer dans les prochaines requêtes
    res.status(StatusCodes.OK).json({
        jwt: token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
};
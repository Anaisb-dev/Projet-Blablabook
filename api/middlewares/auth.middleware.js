// MIDDLEWARE D'AUTHENTIFICATION ET DE VALIDATION
// Ce fichier contient les fonctions qui s'exécutent AVANT
// les controllers pour vérifier les données et l'identité

// Joi : librairie de validation de données
import Joi from "joi";
import "dotenv/config";
// checkBody : fonction utilitaire qui applique le schéma Joi et renvoie les erreurs
import { checkBody } from "../utils/checkBody.util.js";
// StatusCodes : constantes HTTP (401, 403, etc.) pour éviter les "magic numbers"
import { StatusCodes } from "http-status-codes";
// jsonwebtoken : librairie pour créer et vérifier les tokens JWT
import jwt from "jsonwebtoken";


// VALIDATION DE L'INSCRIPTION
// Vérifie que les données envoyées par le formulaire d'inscription
// respectent les règles définies avant d'appeler le controller

export function validateUserRegistration(req, res, next) {

    // Définition du schéma de validation avec Joi
    const userRegisterSchema = Joi.object({

        username: Joi.string()
            // Autorise : lettres (toutes langues), chiffres, _, -, .
            .pattern(/^[\p{L}0-9_.-]+$/u)
            .min(3)     // Minimum 3 caractères
            .max(30)    // Maximum 30 caractères
            .required(), // Champ obligatoire

        email: Joi.string()
            .email()    // Vérifie que le format est bien une adresse email valide
            .required(),

        password: Joi.string()
            // Le mot de passe doit contenir :
            // au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*._-])[A-Za-z\d@*._-]+$/)
            .min(8)     // Minimum 8 caractères
            .required(),

        confirmPassword: Joi.string()
            // Joi.ref('password') vérifie que confirmPassword est identique à password
            .valid(Joi.ref('password'))
            .required()
            .messages({
                // Messages d'erreur personnalisés retournés au client
                'any.only': 'Les mots de passe ne correspondent pas',
                'any.required': 'Veuillez confirmer le mot de passe'
            })
    });

    // On passe le schéma, le body de la requête, res et next à checkBody
    // Si la validation échoue → checkBody renvoie une erreur 400
    // Si elle réussit → next() est appelé et on passe au controller
    checkBody(userRegisterSchema, req.body, res, next);
};



// VALIDATION DE LA CONNEXION
// Vérifie simplement que l'identifiant et le mot de passe
// sont bien présents dans la requête

export function validateUserLogin(req, res, next) {

    const userLoginSchema = Joi.object({
        // identifier peut être un username OU un email (géré dans le controller)
        identifier: Joi.string().required(),
        password: Joi.string().required()
    });

    checkBody(userLoginSchema, req.body, res, next);
};



// MIDDLEWARE D'AUTHENTIFICATION JWT
// Protège les routes qui nécessitent d'être connecté
// S'exécute avant le controller pour vérifier le token JWT

export function authenticate(req, res, next) {

    // On récupère le header Authorization envoyé par le client
    // Format attendu : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    const authHeader = req.headers.authorization;

    // Si le header est absent ou ne commence pas par "Bearer "
    // → on refuse l'accès avec une erreur 401 (Non autorisé)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Authorization token missing or invalid" });
    }

    // On sépare "Bearer" du token et on garde uniquement le token
    // Exemple : "Bearer abc123" → ["Bearer", "abc123"] → on prend "abc123"
    const token = authHeader.split(" ")[1];

    try {
        // jwt.verify() vérifie deux choses :
        // 1. La signature du token (correspond à JWT_SECRET ?)
        // 2. La date d'expiration (token encore valide ?)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Si le token est valide, on ajoute les infos de l'utilisateur
        // à l'objet req pour que le controller puisse y accéder
        // (notamment req.user.id pour identifier qui fait la requête)
        req.user = decoded;

        // Tout est OK → on passe au controller suivant
        next();

    } catch (error) {
        // Le token est invalide ou expiré → erreur 401
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Invalid or expired token" });
    }
};
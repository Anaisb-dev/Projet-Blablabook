import Joi from "joi";
import "dotenv/config";
import { checkBody } from "../utils/checkBody.util.js";

// Middleware de validation des modifications des informations utilisateur
export function validateUserSettings(req, res, next) {
    const validateUserSchema = Joi.object({
        username: Joi.string()
            .pattern(/^[a-zA-Z0-9_.-]+$/)
            // Autorise uniquement lettres, chiffres, _, -, .
            .min(3)
            .max(30)
            .trim() // Supprime les espaces au début et à la fin
            .empty("") // Si la valeur est une chaîne vide "", elle est considérée comme absente
            .optional(), // Le champ est facultatif (PATCH = modification partielle)

        email: Joi.string()
            .email()
            .trim()
            .empty("") 
            .optional(),

        last_name: Joi.string()
            .min(2)
            .max(30)
            .trim()
            .empty("")
            .optional(),

        first_name: Joi.string()
            .min(2)
            .max(30)
            .trim()
            .empty("")
            .optional(),

        bio: Joi.string()
            .min(2)
            .max(250)
            .trim()
            .empty("")
            .optional()
    })
    .min(1); // Oblige à envoyer au moins un champ (évite les requêtes vides {})

    checkBody(validateUserSchema, req.body, res, next);
}


// Middleware pour la modification du mot de passe de l'utilisateur
export function validatePasswordUpdate(req, res, next) {
    const validatePasswordSchema = Joi.object({
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*._-])[A-Za-z\d@*._-]+$/)
            // Doit contenir minuscule, majuscule, chiffre et caractère spécial
            .min(8)
            .required(),

        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Les mots de passe ne correspondent pas',
                'any.required': 'Veuillez confirmer le mot de passe'
            })
    });

    checkBody(validatePasswordSchema, req.body, res, next);
}
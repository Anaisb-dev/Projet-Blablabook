import Joi from "joi";
import "dotenv/config";
import { checkBody } from "../utils/checkBody.util.js";

// Middleware de validation de modification de modifications d'informations de l'utilisateur
export function validateUserSettings(req, res, next) {
    const validateUserSchema = Joi.object({
        username: Joi.string()
            .pattern(/^[a-zA-Z0-9_.-]+$/)
            // .pattern = minuscule, majuscule, chiffre + _, -, . autorisé dans le username
            .min(3).max(30)
            .required(),

        email: Joi.string()
            .email()
            .required(),
        
        last_name : Joi.string()
            .min(2).max(30),

        first_name : Joi.string()
            .min(2).max(30),

        bio : Joi.string()
        .min(2).max(250)
    });
    checkBody(validateUserSchema, req.body, res, next);
};

// Middleware pour la modification du mot de passe de l'utilisateur
export function validatePasswordUpdate(req, res, next) {
    const validatePasswordSchema = Joi.object({
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*._-])[A-Za-z\d@*._-]+$/)
            // .pattern = au moins 1 min, au moins 1 maj, au moins 1 chiffre, au moins 1 caractère spécial
            .min(8)
            .required(),

        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Les mots de passe ne correspondent pas',
                'any.required': 'Veuillez confirmer le mot de passe'
                // permet d'afficher un message côté serveur
            })
    });

    checkBody(validatePasswordSchema, req.body, res, next);
};
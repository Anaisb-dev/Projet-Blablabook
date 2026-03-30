// Middleware concernant les authentifications

import Joi from "joi";
import "dotenv/config";
import { checkBody } from "../utils/checkBody.util.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export function validateUserRegistration(req, res, next) {
    const userRegisterSchema = Joi.object({
        username: Joi.string()
            .pattern(/^[a-zA-Z0-9_.-]+$/)
            // .pattern = minuscule, majuscule, chiffre + _, -, . autorisé dans le username
            .min(3).max(30)
            .required(),

        email: Joi.string()
            .email()
            .required(),

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

    checkBody(userRegisterSchema, req.body, res, next);
};


export function validateUserLogin(req, res, next) {
    const userLoginSchema = Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required()
    });

    checkBody(userLoginSchema, req.body, res, next);
};

export function authenticate(req, res, next) {
    // Ici, on recupere le token si il existe
    const authHeader = req.headers.authorization;

    // Si le token n'existe pas ou qu'il ne commence pas par Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Authorization token missing or invalid" });
    }

    // On separer notre chaine de caractere sur espace, et on garde la partie apres.
    // On recupere uniquement le token
    const token = authHeader.split(" ")[1];

    try {
        // JWT verifie que le token est valide et qu'il n'est pas expiré
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Ici, on ajoute a la requete l'id de l'utilisateur connecté
        //@TODO Verifier que l'user_id correspond a un utilisateur existant
        req.user = decoded;
        next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Invalid or expired token" });
    }
};
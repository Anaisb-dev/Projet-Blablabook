// Middleware concernant les authentifications

import Joi from "joi";
import "dotenv/config";
import { checkBody } from "../utils/checkBody.util.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";

export function validateUserRegistration(req, res, next) {
    const userRegisterSchema = Joi.object({
        username: Joi.string()
            .pattern(/^[a-zA-Z0-9_.-]+$/)
            // .pattern = minuscule, majuscule, chiffre + _, -, . autorisé dans le username
            .min(3).max(15)
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


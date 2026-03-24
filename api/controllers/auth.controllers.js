import "dotenv/config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";

export async function registerUser(req, res) {

    const hashedPassword = await argon2.hash(req.body.password);
    // Stockage du password hasher via Argon2 dans une variable

    try {
        const userId = await User.findOne({
            where: { email: req.body.email }
        });
        // Récupération de l'id via l'email de l'user

        const userCreate = await User.create({
            username: req.body.username,
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            password: hashedPassword,
        })
        // Création de l'user avec l'envoi de ses informations
        res.status(StatusCodes.CREATED).json({id: userCreate.id, username: userCreate.username});
        // Renvoie de l'id et de l'username
    } catch (error)
}
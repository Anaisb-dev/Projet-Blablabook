import "dotenv/config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";


// FONCTION INSCRIPTION -

export async function registerUser(req, res) {

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
        // Création de l'user avec l'envoi de ses informations
        res.status(StatusCodes.CREATED).json({ id: userCreate.id, username: userCreate.username });
        // Renvoie de l'id et de l'username
    } catch (error) {
        console.error(error);
        
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(StatusCodes.CONFLICT).json({error: `Field already exists: ${error.errors[0].path}`});
        }
        // "error.errors[0].path", je retourne un tableau des erreurs, je prends la 1ere erreur et je récupére le champs concerné,
        // il sera donc évolutif suivant le cas rencontré : mail, username déjà existant dans la bdd
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
};
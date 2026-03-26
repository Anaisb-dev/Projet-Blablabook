import "dotenv/config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import { Op } from "sequelize";


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
        // Création de l'user avec l'envoi de ses informations
        res.status(StatusCodes.CREATED).json({ id: userCreate.id, username: userCreate.username });
        // Renvoie de l'id et de l'username
    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(StatusCodes.CONFLICT).json({ error: `Ce contenu existe déjà : ${error.errors[0].path}` });
        }
        // "error.errors[0].path", je retourne un tableau des erreurs, je prends la 1ere erreur et je récupére le champs concerné,
        // il sera donc évolutif suivant le cas rencontré : mail, username déjà existant dans la bdd
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
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
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid username or password" });
    }
    // Si l'utilisateur n'existe pas OU que le mot de passe est incorrect, on retourne un statut "Non authorisé"

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h"
        // on créée une variable pour stocker un token générer à la connexion, il utilise l'id, il expire toutes les 2h
    });

    res.status(StatusCodes.OK).json({ token });
};
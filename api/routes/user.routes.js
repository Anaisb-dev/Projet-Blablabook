// Router concernant l'utilisateur

import express from "express";
import { getProfile, 
    getSettings, 
    updateSettings, 
    getUserBooks, 
    getUserBookById, 
    updateUserBook,
    deleteUserBook,fakeAuth } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/profile', fakeAuth, getProfile);
// Compte de l'utilisateur
router.get('/settings', fakeAuth, getSettings);
// Infos perso de l'utilisateur
router.patch('/settings', fakeAuth, updateSettings);
// Modification des infos perso de l'utilisateur
router.get('/books', fakeAuth, getUserBooks);
// Afficher tous les livres de l'utilisateur
// router.get('/books/:id', fakeAuth, getUserBookById);
router.get("/books", (req, res) => {
    console.log("Route /users/books appelée ✅");
    res.json([]);
});
// Récupérer un livre via son id (ex: page détail d'un livre)
router.patch('/books/:id', fakeAuth, updateUserBook);
// Modifier le statut d'un livre présent dans notre compte
router.delete('/books/:id', fakeAuth, deleteUserBook);
// Permet de supprimer un livre de sa bibliothèque



export default router;
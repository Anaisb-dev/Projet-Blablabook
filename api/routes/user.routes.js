// Router concernant l'utilisateur

import express from "express";
import { getProfile, 
    getSettings, 
    updateSettings, 
    getUserBooks, 
    getUserBookById, 
    updateUserBook,
    deleteUserBook,addGoogleBookToLibrary, 
    getAllUsers} from "../controllers/user.controller.js";
import { updatePassword } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateUserSettings, validatePasswordUpdate} from "../middlewares/user.middleware.js"

const router = express.Router();

router.get('/all', getAllUsers);
// route test all user

router.get('/profile', getProfile);
// Compte de l'utilisateur

router.get('/settings', getSettings);
// Infos perso de l'utilisateur

router.patch('/settings', authenticate, validateUserSettings, updateSettings);
// Modification des infos perso de l'utilisateur

router.patch('/password', authenticate, validatePasswordUpdate, updatePassword);
// Modification du mot de passe avec hash de l'utilisateur

router.get('/books', getUserBooks);
// Afficher tous les livres de l'utilisateur

router.get('/books/:id', getUserBookById);
// Récupérer un livre via son id (ex: page détail d'un livre)

router.patch('/books/:id', updateUserBook);
// Modifier le statut d'un livre présent dans notre compte

router.post('/books/:googleBookId', addGoogleBookToLibrary);
// Ajouter un livre à sa bibliothèque via googlebookapi

router.delete('/books/:id', deleteUserBook);
// Permet de supprimer un livre de sa bibliothèque



export default router;
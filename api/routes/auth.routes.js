// Router concernant l'authentification

import express from "express";
import { confirmEmail, loginUser, registerUser } from "../controllers/auth.controller.js";
import { validateUserRegistration, validateUserLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
// Route qui permet de s'inscrire

router.post('/login', validateUserLogin, loginUser);
// Route qui permet de se connecter

router.get('/confirm', confirmEmail);
// Route qui redirige le l'utilisateur pour la confirmation du compte

export default router;

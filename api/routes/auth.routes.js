// Router concernant l'authentification

import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { validateUserRegistration, validateUserLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
// Route qui permet de s'inscrire

router.post('/login', validateUserLogin, loginUser);
// Route qui permet de se connecter

export default router;

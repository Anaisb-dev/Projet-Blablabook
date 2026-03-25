// Router concernant l'authentification

import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { validateUserRegistration } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
// Route qui permet de s'inscrire

// router.post('/login');
// Route qui permet de se connecter

export default router;

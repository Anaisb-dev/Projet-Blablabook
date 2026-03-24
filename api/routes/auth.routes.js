// Router concernant l'authentification

import express from "express";
import { registerUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/register', registerUser);
// Route qui permet de s'inscrire
// router.post('/login');
// Route qui permet de se connecter

export default router;

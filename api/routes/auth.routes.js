// Router concernant l'authentification

import express from "express";

const router = express.Router();

router.post('/register');
// Route qui permet de s'inscrire
router.post('/login');
// Route qui permet de se connecter

export default router;
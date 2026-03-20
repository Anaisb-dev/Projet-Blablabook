// Router concernant l'utilisateur

import express from "express";

const router = express.Router();

router.patch('/settings');
// Modification des infos perso
router.get('/books');
// Récupérer tous les livres de l'utilisateur
router.post('/books');
// Ajout d'un livre à sa bibliothèque
router.get('/books/:id');
// Récupérer un livre via son id (ex: page détail d'un livre)
router.delete('/books/:id');
// Permet de supprimer un livre de sa bibliothèque

// Router concernant les livres

import express from "express";

const router = express.Router();
router.get('/');
// Afficher les livres par genre et popularité
router.get('/search');
// Rechercher un livre via Google Books
router.get('/:id');
// La page détail d'un livre via son id


export default router;
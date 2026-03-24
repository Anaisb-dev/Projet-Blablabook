// Router concernant les livres

import express from "express";
import { searchBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Liste des livres OK");
});
// Afficher les livres par genre et popularité

router.get('/search', searchBooks);
// Rechercher un livre via Google Books

router.get('/:id', (req, res) => {
    res.send("Détail du livre OK");
});
// La page détail d'un livre via son id


export default router;
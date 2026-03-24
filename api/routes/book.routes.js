// Router concernant les livres

import express from "express";
import { searchBooks, getBookById } from "../controllers/book.controller.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Liste des livres OK");
});
// Afficher les livres par genre et popularité

router.get('/search', searchBooks);
// Rechercher un livre via Google Books

router.get('/:id', getBookById);
// La page détail d'un livre via son id


export default router;
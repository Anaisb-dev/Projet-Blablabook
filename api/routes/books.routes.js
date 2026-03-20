// Router concernant les livres

import express from "express";

const router = express.Router();
router.get('/');
// La route pour récupérer tous les livres
router.get('/:id');
// La route pour récupérer un livre via son id
// Router concernant l'utilisateur

import express from "express";

const router = express.Router();

router.get('/profile');
// Compte de l'utilisateur
router.get('/settings');
// Infos perso de l'utilisateur
router.patch('/settings');
// Modification des infos perso de l'utilisateur
router.get('/books');
// Afficher tous les livres de l'utilisateur
router.get('/books/:id');
// Récupérer un livre via son id (ex: page détail d'un livre)
router.patch('/books/:id')
// Modifier le statut d'un livre présent dans notre compte
router.delete('/books/:id');
// Permet de supprimer un livre de sa bibliothèque


/* Voir avec Aleth
router.post('/books');
Ajout d'un livre à sa bibliothèque
*/


export default router;
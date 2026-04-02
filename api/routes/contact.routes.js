// Router concernant la page contact

import express from "express";
import { contact } from "../controllers/contact.controller.js";

const router = express.Router();
router.post('/', contact);
// Envoi d'un formulaire de contact


export default router;
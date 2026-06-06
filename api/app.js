
// POINT D'ENTRÉE DU SERVEUR — app.js
// C'est le fichier principal qui configure et démarre
// le serveur Express de l'API BlablaBook


// Charge les variables d'environnement depuis le fichier .env
// (PORT, DB_URL, JWT_SECRET, etc.)
import "dotenv/config";

// Express : framework Node.js pour créer le serveur et gérer les routes
import express from "express";

// CORS : middleware qui contrôle quels domaines peuvent appeler l'API
import cors from "cors";

// Middlewares et routes de l'application
import { errorHandler } from "./middlewares/common.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import bookRoutes from "./routes/book.routes.js";

// Middleware d'authentification JWT (protège les routes privées)
import { authenticate } from "./middlewares/auth.middleware.js";

// On récupère le port depuis les variables d'environnement
// Si PORT n'est pas défini (ex: en local), on utilise 3000 par défaut
const PORT = process.env.PORT || 3000;

// Création de l'application Express
const app = express();


// CONFIGURATION CORS
// Définit quels domaines sont autorisés à appeler l'API
// Indispensable pour éviter les erreurs cross-origin en production

app.use(cors({
    // Seuls ces deux domaines peuvent faire des requêtes à l'API :
    // - localhost:5173 pour le développement local
    // - l'URL Render pour la production
    origin: ['http://localhost:5173', 'https://blablabook-client-pj37.onrender.com'],

    // Méthodes HTTP autorisées
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    // Headers autorisés dans les requêtes
    // Authorization : pour envoyer le token JWT
    // Content-Type : pour envoyer du JSON
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Permet à Express de lire le corps des requêtes au format JSON
app.use(express.json());



// ROUTES PUBLIQUES
// Ces routes sont accessibles sans être connecté


// Recherche et détail des livres via Google Books
app.use("/api/books", bookRoutes);

// Formulaire de contact
app.use("/api/contact", contactRoutes);

// Inscription et connexion
app.use("/api/auth", authRoutes);



// MIDDLEWARE JWT — SÉPARATION PUBLIC / PRIVÉ
// Tout ce qui est déclaré APRÈS ce middleware nécessite
// d'être authentifié. Les routes au-dessus restent publiques.

app.use(authenticate);



// ROUTES PROTÉGÉES
// Ces routes nécessitent un token JWT valide


// Bibliothèque personnelle, profil, paramètres, suppression de compte
app.use("/api/users", userRoutes);



// GESTION GLOBALE DES ERREURS
// Ce middleware intercepte toutes les erreurs non gérées
// et renvoie une réponse JSON propre au client
app.use(errorHandler);


// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
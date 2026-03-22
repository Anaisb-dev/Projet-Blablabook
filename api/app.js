import "dotenv/config";
import express from "express";

import googleRoutes from "./routes/google.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import bookRoutes from "./routes/book.routes.js";

//import cors from "cors";
//import xss from "xss-clean";
//import errorHandler from "./middlewares/error.middleware.js";

import { authenticate } from "./middlewares/auth.middleware.js";


const PORT = process.env.PORT || 3000;

const app = express();

// Autorise tout les clients a contacter notre API
//app.use(cors());
// Protege contre les injections xss
//app.use(xss());

app.use(express.json());

/* ROUTES PUBLIQUES */

// Auth (login / register)
app.use("/auth", authRoutes);

// API Google Books
app.use("/google", googleRoutes);

// Pages publiques (contact, faq, mentions)
app.use("/contact", contactRoutes);

/* ROUTES PROTEGEES */

// Middleware JWT (Ce middleware s'applique a toutes les routes suivantes, mais pas aux precedentes)
app.use(authenticate);

// Routes utilisateur
app.use("/users", userRoutes);

// Gestion des livres perso (UserBook)
app.use("/books", bookRoutes);

// Middleware de gestion des erreurs
//app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
import "dotenv/config";
import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/common.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import bookRoutes from "./routes/book.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://blablabook-client-pj37.onrender.com'], // ton frontend
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

/* ROUTES PUBLIQUES */

// Gestion des livres
app.use("/api/books", bookRoutes);

// Pages publiques (contact, faq, mentions)
app.use("/api/contact", contactRoutes);

// Auth (login / register)
app.use("/api/auth", authRoutes);

/* ROUTES PROTEGEES */

// Ce middleware s'applique a toutes les routes suivantes, mais pas aux precedentes
app.use(authenticate);

// Routes utilisateur
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
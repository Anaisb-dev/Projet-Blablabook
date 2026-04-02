import "dotenv/config";
import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/common.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
//import contactRoutes from "./routes/contact.routes.js";
import bookRoutes from "./routes/book.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";

const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // ton frontend
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

/* ROUTES PUBLIQUES */

// Auth (login / register)
app.use("/auth", authRoutes);
-
// Gestion des livres
app.use("/books", bookRoutes);

// Pages publiques (contact, faq, mentions)
//app.use("/contact", contactRoutes);

/* ROUTES PROTEGEES */

// Ce middleware s'applique a toutes les routes suivantes, mais pas aux precedentes
app.use(authenticate);

// Routes utilisateur
app.use("/users", userRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
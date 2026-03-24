import "dotenv/config";
import express from "express";

// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import contactRoutes from "./routes/contact.routes.js";
import bookRoutes from "./routes/book.routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

/* ROUTES PUBLIQUES */

// Auth (login / register)
// app.use("/auth", authRoutes);

// Gestion des livres
app.use("/books", bookRoutes);

// Pages publiques (contact, faq, mentions)
// app.use("/contact", contactRoutes);

/* ROUTES PROTEGEES */

// Routes utilisateur
// app.use("/users", userRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
import { sequelize } from "./models/sequelize.client.js";

 // Test de connexion à la BDD
try {
    await sequelize.authenticate();
    console.log("Connexion à la BDD réussie ✅");
} catch (error) {
    console.error("Erreur de connexion ❌", error);
}
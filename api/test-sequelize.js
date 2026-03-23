import { sequelize } from "./models/sequelize.client.js";

async function testConnexion() {
    try {
        await sequelize.authenticate();
        console.log("Connexion à la BDD réussie ✅");
    } catch (error) {
        console.error("Erreur de connexion ❌", error);
    }
}

testConnexion();
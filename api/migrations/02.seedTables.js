import { User, Book, Author, Gender, UserBook, sequelize} from "../models/index.js";
import argon2 from "argon2";

console.log("Ajout de livres de test...");

const book1 = await Book.create({
    code_isbn: 2290391174,
    title: "La femme de ménage",
    year: 2023,
    page_number: 416
});

const book2 = await Book.create({
    code_isbn: 2075187541,
    title: "Harry Potter à l'école des sorciers",
    year: 1997,
    page_number: 309
});

console.log("Ajout d'auteurs de test...");

await Author.create({
    last_name: "McFadden",
    first_name: "Freida"
});

await Author.create({
    last_name: "Rowling",
    first_name: "J.K."
});

console.log("Ajout des genres de livres...");

await Gender.create({ name: "Fantastique" });
await Gender.create({ name: "Roman" });
await Gender.create({ name: "Science-Fiction" });
await Gender.create({ name: "Poésie" });


console.log("Ajout de users de test");

const chloe = await User.create({ 
    pseudo: "Chloé",
    last_name: "Da Silva",
    first_name: "Chloé",
    email: "chloe@test.com", 
    password: await argon2.hash("test123")});


console.log("Liaison user/livre avec statut");

await chloe.addBook(book1, { 
    through: { status: "à lire" } 
});
await chloe.addBook(book2, { 
    through: { status: "lu" } 
});


console.log("✅ Migration OK ! Fermeture de la base..."); // On ferme le tunnel de connexion pour que le script s'arrête bien
await sequelize.close();
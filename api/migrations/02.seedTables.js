import { User, Book, Author, Gender, sequelize} from "../models/index.js";
import argon2 from "argon2";

console.log("Ajout de livres de test...");

const book1 = await Book.create({
    code_isbn: 2290391174,
    title: "La femme de ménage",
    year: 2023,
    summary: "Un roman poignant qui explore les complexités de la vie à travers les yeux d'une femme de ménage. Entre les secrets du passé et les défis du présent, ce livre nous plonge dans une histoire riche en émotions.",
    page_number: 416,
    cover_image: "https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/45_9782290391174_1_75.jpg"
});

const book2 = await Book.create({
    code_isbn: 2075187541,
    title: "Harry Potter à l'école des sorciers",
    year: 1997,
    summary: "Le premier tome de la célèbre série Harry Potter, où le jeune sorcier découvre ses pouvoirs et son destin à l'école de magie de Poudlard. Un classique de la littérature jeunesse qui a captivé des millions de lecteurs à travers le monde.",
    page_number: 309,
    cover_image: "https://m.media-amazon.com/images/I/81jVPDq3HKL._AC_UF1000,1000_QL80_.jpg"
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
    username: "Chloé",
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

console.log("Chloé ID:", chloe.id);
console.log("Book1 ID:", book1.id);
console.log("Book2 ID:", book2.id);

console.log("✅ Migration OK ! Fermeture de la base..."); // On ferme le tunnel de connexion pour que le script s'arrête bien
await sequelize.close();
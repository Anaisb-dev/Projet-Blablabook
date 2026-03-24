import { User, Book, Author, Gender, sequelize } from "../models/index.js";

// Relations
User.belongsToMany(Book, { through: "UserBook" });
Book.belongsToMany(User, { through: "UserBook" });
Book.belongsToMany(Author, { through: "book_author" });
Author.belongsToMany(Book, { through: "book_author" });
Book.belongsToMany(Gender, { through: "gender_book" });
Gender.belongsToMany(Book, { through: "gender_book" });

await sequelize.authenticate();
await sequelize.sync({ force: true });
console.log("Tables créées !");
process.exit();
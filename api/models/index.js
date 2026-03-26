import { sequelize } from "../models/sequelize.client.js";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Author } from "../models/author.model.js";
import { Gender } from "../models/gender.model.js";
import { UserBook } from "../models/userBook.model.js";


// Relations N:N
User.belongsToMany(Book, {
    through: UserBook,
    foreignKey: "user_id", // clé étrangère du modèle d'origine
    otherKey: "book_id", // clé étrangère du modèle cible
    as: "books"
});

Book.belongsToMany(User, {
    through: UserBook,
    foreignKey: "book_id",
    otherKey: "user_id",
    as: "users"
});

UserBook.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserBook.belongsTo(Book, { foreignKey: "book_id", as: "book" });
User.hasMany(UserBook, { foreignKey: "user_id" });
Book.hasMany(UserBook, { foreignKey: "book_id" });

Book.belongsToMany(Author, {
    through: "book_author",
    foreignKey: "book_id",
    otherKey: "author_id",
    as: "authors"
});

Author.belongsToMany(Book, {
    through: "book_author",
    foreignKey: "author_id",
    otherKey: "book_id",
    as: "books"
});

Book.belongsToMany(Gender, {
    through: "gender_book",
    foreignKey: "book_id",
    otherKey: "gender_id",
    as: "genders"
});

Gender.belongsToMany(Book, {
    through: "gender_book",
    foreignKey: "gender_id",
    otherKey: "book_id",
    as: "books"
}); 

export {
    User,
    Book,
    Author,
    Gender,
    UserBook,
    sequelize
};
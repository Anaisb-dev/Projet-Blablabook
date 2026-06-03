import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Book extends Model { }

Book.init(
    {
        google_book_id: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: true,
        },
        code_isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        page_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cover_image: {
            type: DataTypes.TEXT, // URL de l'image
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Book",
        tableName: "book"
    },
);
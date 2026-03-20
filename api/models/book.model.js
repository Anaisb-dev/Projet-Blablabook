import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Book extends Model { }

Book.init(
    {
        code_isbn: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER(7),
        },
        page_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Book",
        tableName: "book"
    },
);
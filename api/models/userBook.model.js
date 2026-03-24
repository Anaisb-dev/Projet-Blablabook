import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class UserBook extends Model { }

UserBook.init(
    {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "UserBook",
        tableName: "user_book",
        timestamps: false
    },
);
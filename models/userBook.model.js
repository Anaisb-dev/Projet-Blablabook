import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class UserBook extends Model { }

UserBook.init(
    {
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
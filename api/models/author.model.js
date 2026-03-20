import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Author extends Model { }

Author.init(
    {
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(7),
        },
    },
    {
        sequelize,
        modelName: "Author",
        tableName: "author"
    },
);
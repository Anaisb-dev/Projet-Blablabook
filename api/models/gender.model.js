import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Gender extends Model { }

Gender.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Gender",
        tableName: "gender"
    },
);
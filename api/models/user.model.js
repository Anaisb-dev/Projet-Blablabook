import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user"
  },
);

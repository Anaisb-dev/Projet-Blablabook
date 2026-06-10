// On importe Model et DataTypes depuis Sequelize
// Model : classe de base que tous nos modèles vont étendre
// DataTypes : permet de définir le type de chaque colonne (STRING, BOOLEAN, etc.)
import { Model, DataTypes } from "sequelize";

// On importe la connexion à la base de données PostgreSQL
import { sequelize } from "./sequelize.client.js";

// On crée la classe User qui hérite de Model
// Cela donne accès à toutes les méthodes Sequelize : findAll, findOne, create, update, destroy...
export class User extends Model {}

// User.init() définit la structure de la table "users" en base de données
// Chaque propriété correspond à une colonne de la table
User.init(
  {
    username: {
      type: DataTypes.STRING,   // Type VARCHAR en SQL
      allowNull: false,         // Le champ est obligatoire
      unique: true              // Deux utilisateurs ne peuvent pas avoir le même pseudo
    },
    last_name: {
      type: DataTypes.STRING,   // Optionnel (pas de allowNull: false)
    },
    first_name: {
      type: DataTypes.STRING    // Optionnel
    },
    bio: {
      type: DataTypes.TEXT,     // Type TEXT pour les longues chaînes
      validate: {
        len: [0, 250]           // Validation : la bio ne peut pas dépasser 250 caractères
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,         // Obligatoire
      unique: true              // Deux utilisateurs ne peuvent pas avoir le même email
    },
    password: {
      type: DataTypes.TEXT,     // TEXT car le hash Argon2 peut être long
      allowNull: false          // Obligatoire
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false       // Par défaut, le compte n'est pas vérifié
                                // Passe à true après confirmation par email
    }
  },
  {
    sequelize,                  // La connexion à la base de données
    modelName: "User",          // Nom du modèle utilisé en interne par Sequelize
    tableName: "users"          // Nom exact de la table en base de données
  },
);
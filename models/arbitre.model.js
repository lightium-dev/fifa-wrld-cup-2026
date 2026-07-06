import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Arbitre = sequelize.define(
  "Arbitre",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confederation: {
      type: DataTypes.ENUM("UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"),
      allowNull: false,
    },
    categorie: {
      type: DataTypes.ENUM("Referee", "Assistant", "Fourth", "VAR", "AVAR"),
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    statut: {
      type: DataTypes.ENUM("actif", "suspendu", "blessé", "retraité"),
      allowNull: false,
      defaultValue: "actif",
    },
  },
  {
    tableName: "arbitres",
    timestamps: false,
    indexes: [
      { fields: ["confederation"] },
      { fields: ["statut"] },
    ],
  }
);

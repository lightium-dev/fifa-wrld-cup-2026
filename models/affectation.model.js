import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Affectation = sequelize.define(
  "Affectation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    arbitreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "arbitres",
        key: "id",
      },
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "matchs",
        key: "id",
      },
    },
    role: {
      type: DataTypes.ENUM("Referee", "Assistant", "VAR", "AVAR", "Fourth"),
      allowNull: false,
    },
  },
  {
    tableName: "affectations",
    timestamps: false,
    indexes: [
      { fields: ["arbitreId"] },
      { fields: ["matchId"] },
      { unique: true, fields: ["arbitreId", "matchId", "role"] },
    ],
  }
);

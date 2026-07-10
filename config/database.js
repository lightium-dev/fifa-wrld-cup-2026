import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const required = ["DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(`Missing DB env variables: ${missing.join(", ")}`);
}

export const sequelize = new Sequelize({
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  dialect: "postgres",
  logging: false,
});

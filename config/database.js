import { Sequelize } from "sequelize";
import "dotenv/config"

export const sequelize = new Sequelize({
    password:process.env.DB_PASSWORD,
    username:process.env.DB_USER,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:"postgres",

})
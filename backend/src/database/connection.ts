import { Sequelize } from "sequelize-typescript"
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "../config/env.ts"

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Database Config:', {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD: DB_PASSWORD ? '***' : '(empty)',
    DB_HOST,
    DB_PORT
});

const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    models: [path.join(__dirname, "../models")],
    logging: false // Set to console.log to see SQL queries
})

console.log([path.join(__dirname, "../models")])

sequelize.authenticate()
    .then(() => {
        console.log("authentication complete")
    }).catch((error) => {
        console.log("authentication failed", error.message)
    });

sequelize.sync({alter: true})
.then(() => {
    console.log("database migration complete")
}) .catch ((error) => {
    console.error("database migration failed", error.message)
})

export default sequelize;
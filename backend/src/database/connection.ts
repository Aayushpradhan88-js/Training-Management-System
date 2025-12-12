//DATABASE CONNECTION FILE

import 'reflect-metadata';
import { Sequelize } from "sequelize-typescript"
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "../config/env.js"
import { User } from './models/userModel.js';
import { config } from 'dotenv'
config();

const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
});

sequelize.addModels([User]);

console.log("✅ step 10: DB authentication started")
sequelize.authenticate()
    .then(() => {
        console.log("authentication complete")
    }).catch((error) => {
        console.log("authentication failed", error.message)
    });

console.log("✅ step 11: DB MIGRATION")
sequelize.sync({ alter: false })
    .then(() => {
        console.log("database migration complete")
    }).catch((error) => {
        console.error("database migration failed", error.message)
    })

export default sequelize;
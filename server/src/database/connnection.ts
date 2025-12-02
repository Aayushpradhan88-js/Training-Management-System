//DATABASE CONNECTION CODE

import { Sequelize } from 'sequelize'
import fileConfig from '../config/config.ts'

const config = fileConfig();

const sequelizeDB = new Sequelize({
    database: config.DB_NAME,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    dialect: "mysql"
});

sequelizeDB.authenticate()
    .then(() => {
        console.log("authentication completed");
    }).catch((error) => {
        console.error("authentication failed", error.stack);
    });

export default sequelizeDB;
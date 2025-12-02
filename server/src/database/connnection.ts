//DATABASE CONNECTION CODE

import { Sequelize } from 'sequelize'
import fileConfig from '../config/config.ts'

const config = fileConfig();

const sequalizeDB = new Sequelize({
    database: config.DB_NAME,
    username: config.DB_Username,
    password: config.DB_Password,
    host: Number(config.DB_Port),
    port: Number(config.DB_Port),
    dialect: "mysql"
});

sequalizeDB.authenticate()
    .then(() => {
        console.log("authentication completed");
    }).catch((error) => {
        console.error("auhentication failed", error.stack);
    });

export default sequalizeDB;
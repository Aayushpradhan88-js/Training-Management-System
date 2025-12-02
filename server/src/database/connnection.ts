import { Sequelize } from 'sequelize'
import fileConfig from '../config/config.ts'

const sequalizeDB = new Sequelize({
    database: fileConfig().dbName,
    username: fileConfig().dbUsername,
    password: fileConfig().dbPassword,
    host: fileConfig().dbPort,
    dialect: "mysql",
    port: Number(fileConfig().dbPort),
});

sequalizeDB.authenticate()
    .then(() => {
        console.log("authentication completed");
    }).catch((error) => {
        console.error("auhentication failed", error.stack);
    });

export default sequalizeDB;
//DATABASE CONNECTION CODE

import { Sequelize } from 'sequelize-typescript'
import fileConfig from '../config/config.ts'

const config = fileConfig();

const sequelizeDB = new Sequelize({
    database: config.DB_NAME,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    dialect: "mysql",
    models: [__dirname + '/models'] //getting model directory 
});

//authentication
sequelizeDB.authenticate()
    .then(() => {
        console.log("authentication completed");
    }).catch((error) => {
        console.error("authentication failed", error.stack);
    });

//migration
sequelizeDB.sync({ force: false })
    .then(() => {
        console.log("migration successfull🎉🎉");
    }).catch((error) => {
        console.error("migration failed😭😭", error.stack);
    })

export default sequelizeDB;
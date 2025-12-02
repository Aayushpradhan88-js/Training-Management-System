//DATABASE CONNECTION CODE

import { Sequelize } from 'sequelize-typescript'
import fileConfig from '../config/config'
import User from './models/userModel';
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const config = fileConfig();
const sequelizeDB = new Sequelize({
    database: config.DB_NAME,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    dialect: "mysql",
//    models: [join(__dirname, 'models')] //path to models
models: [User]
});

//authentication
sequelizeDB.authenticate()
    .then(() => {
        console.log("authentication completed");
    }).catch((error) => {
        console.error("authentication failed", error.stack);
    });

//migration
sequelizeDB.sync({ alter: false})
    .then(() => {
        console.log("migration successfull🎉🎉");
    }).catch((error) => {
        console.error("migration failed😭😭", error.stack);
    })

export default sequelizeDB;
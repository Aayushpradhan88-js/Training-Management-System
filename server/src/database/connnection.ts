import { Sequelize } from 'sequelize'
import { fileConfig } from '../config/config.ts'

const schema = new Sequelize({
    database: fileConfig().dbName,
    username: fileConfig().dbUsername,
    password: fileConfig().dbPassword,
    host: fileConfig().dbPort,
    dialect: "mysql",
    port: Number(fileConfig().dbPort),
});
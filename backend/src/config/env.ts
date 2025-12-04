//CONFIGURATION FILE

import { config } from "dotenv"
config();

const SERVER_PORT = parseInt(process.env.PORT || '6000')
const DB_NAME = process.env.DB_NAME as string
const DB_USERNAME = process.env.DB_USERNAME as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_HOST = process.env.DB_HOST as string
const DB_PORT = Number(process.env.DB_PORT)|| 3306

export {
    SERVER_PORT,
    DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT
}
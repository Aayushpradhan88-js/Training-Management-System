//Config file

import {config} from 'dotenv'
config();

function fileConfig(){
    return {
        PORT: process.env.PORT || 3000,
        dbName:process.env.DB_NAME,
        dbUsername:process.env.DB_USERNAME,
        dbPassword:process.env.DB_PASSWORD,
        dbHost:process.env.DB_HOST,
        dbPort:process.env.DB_PORT
    };
};

export {fileConfig};
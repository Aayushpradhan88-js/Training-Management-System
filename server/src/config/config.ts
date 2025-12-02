//Config file

import {config} from 'dotenv'
config();

function fileConfig() {
    return {
        PORT: process.env.PORT || 3000,
        DB_NAME:process.env.DB_NAME,
        DB_USERNAME:process.env.DB_USERNAME,
        DB_PASSWORD:process.env.DB_PASSWORD,
        DB_HOST:process.env.DB_HOST || 'localhost',
        DB_PORT:process.env.DB_PORT
    };
};

export default fileConfig;
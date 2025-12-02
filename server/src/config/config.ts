//Config file

import {config} from 'dotenv'
config();

function fileConfig() {
    return {
        PORT: process.env.PORT || 3000,
        DB_NAME:process.env.DB_NAME,
        DB_Username:process.env.DB_USERNAME,
        DB_Password:process.env.DB_PASSWORD,
        DB_Host:process.env.DB_HOST,
        DB_Port:process.env.DB_PORT
    };
};

export default fileConfig;
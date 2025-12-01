import {config} from 'dotenv'
config();


function fileConfig(){
    return {
        PORT: process.env.PORT || 3000,
    }
}

export {fileConfig};
import app from "./src/app.ts";
import { config } from "dotenv";
config();
import  "../backend/src/database/connection.ts"

function startServer() {
    const port = 3000;
    app.listen(() => {
        console.log(`Server is running on port: ${port}`)
    })
}

startServer();
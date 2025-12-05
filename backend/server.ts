import app from "./src/app.js";
import { SERVER_PORT } from "./src/config/env.js";
import "./src/database/connection.js";
import { config } from "dotenv"
config()

function startServer() {
    const port:number = SERVER_PORT;
    app.listen(port,() => {
        console.log(`Server is running on port: ${port}`);
    });
}

startServer();
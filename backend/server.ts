import app from "./src/app.ts";
import { DB_PORT } from "./src/config/env.ts";
import "./src/database/connection.ts";
import { config } from "dotenv"
config()

function startServer() {
    const port:number = DB_PORT;
    app.listen(port,() => {
        console.log(`Server is running on port: ${port}`);
    });
}

startServer();
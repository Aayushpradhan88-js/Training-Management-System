//Server file (main file)

import app from "./src/app.ts"
import fileConfig from "./src/config/config.ts";
import sequelizeDB from "./src/database/connnection.ts";

sequelizeDB;

function startServer() {
    const port = fileConfig().PORT;
    app.listen(port, () => {
        console.log(`SYSTEM SERVER IS RUNNING ON PORT: ${port}`);
    });
};

startServer();
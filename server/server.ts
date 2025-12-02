//Server file (main file)

import app from "./src/app"
import fileConfig from "./src/config/config";
import sequelizeDB from "./src/database/connnection";

sequelizeDB;

function startServer() {
    const port = fileConfig().PORT;
    app.listen(port, () => {
        console.log(`SYSTEM SERVER IS RUNNING ON PORT: ${port}`);
    });
};

startServer();
//Server file (main file)

import app from "./src/app.ts"
import fileConfig from "./src/config/config.ts";

function startServer() {
    const port = fileConfig().PORT;
    app.listen(port, () => {
        console.log(`SYSTEM SERVER IS RUNNING ON PORT: ${port}`);
    });
};

startServer();
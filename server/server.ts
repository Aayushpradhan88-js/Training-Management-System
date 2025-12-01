import app from "./src/app";
import { fileConfig } from "./src/config/config";

function startServer() {
    const port = fileConfig().PORT;
    app.listen(port, () => {
        console.log(`SYSTEM SERVER IS RUNNING ON PORT: ${port}`);
    });
};

startServer();
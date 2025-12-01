import app from "./server/src/app";
import { fileConfig } from "./server/src/config/config";

function startServer() {
    const port = fileConfig.PORT;
    app.listen(port, () => {
        console.log(`SYSTEM SERVER IS RUNNING ON PORT: ${port}`);
    });
};

startServer();
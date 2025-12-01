import app from "./server/src/app";

function startServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`SYSTEM SERVER IS RUNNING ON PORT: ${PORT}`);
    });
};

startServer();
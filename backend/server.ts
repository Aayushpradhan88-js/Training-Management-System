import app from "./src/app.ts";

function startServer() {
    const port = 3000;
    app.listen(() => {
        console.log(`Server is running on port: ${port}`)
    })
}

startServer();
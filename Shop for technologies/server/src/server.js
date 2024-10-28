const express = require("express");
const { epxressConfig } = require("./config/express");

const port = 3000;

async function start() {
    const app = express();

    epxressConfig(app);

    app.listen(port, () => {
        console.log(`Server is listening on ${port} port`);
    });
}

start();
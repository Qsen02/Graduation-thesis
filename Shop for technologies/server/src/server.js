const express = require("express");
const { epxressConfig } = require("./config/express");
const { runDB } = require("./config/mongoose");
const { routerConfig } = require("./config/router");

const port = 3000;

async function start() {
    await runDB();
    const app = express();

    epxressConfig(app);
    routerConfig(app);

    app.listen(port, () => {
        console.log(`Server is listening on ${port} port`);
    });
}

start();
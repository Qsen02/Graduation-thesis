const express = require("express");
const { setCors } = require("../middlewares/cors");
const { session } = require("../middlewares/session");

function epxressConfig(app) {
    app.use(setCors());
    app.use(session());
    app.use(express.json());
}

module.exports = {
    epxressConfig
}
const express = require("express");
const { setCors } = require("../middlewares/cors");

function epxressConfig(app) {
    app.use(setCors());
    app.use(express.json());
}

module.exports = {
    epxressConfig
}
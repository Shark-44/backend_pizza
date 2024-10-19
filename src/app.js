// create express app
const express = require('express');
const app = express();
const port = 3000;

// import and mount the API routes
const router = require("./router")
app.use(router)

// ready to export

module.exports = app
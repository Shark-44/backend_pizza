const path = require("node:path")
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router = require('./router');


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser())

app.use(express.json());


app.use(router);
app.use(express.static(path.join(__dirname, "../public")))
module.exports = app;
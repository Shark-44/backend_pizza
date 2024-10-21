const express = require('express');
const cors = require('cors');
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


app.use(express.json());

const router = require('./router');
app.use(router);

module.exports = app;
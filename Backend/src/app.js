const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("../db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/route.js");

app.use(
  cors({
    origin: process.env.Frontend_url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static("public/image"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

module.exports = app;

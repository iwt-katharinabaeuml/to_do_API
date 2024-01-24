const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

server.use(cors());

server.use(bodyParser.json());

const routes = require("./routes/tasks");

server.use("/", routes);

mongoose
  .connect("mongodb://localhost:27017/to_do")
  .then(server.listen(3001))
  .catch((err) => console.log(err));

const express = require("express");
const server = express();
const mongoose = require("mongoose");

const routes = require("./routes/tasks");

server.use("/", routes);

mongoose
  .connect("mongodb://localhost:27017/to_do")
  .then(server.listen(3000))
  .catch((err) => console.log(err));

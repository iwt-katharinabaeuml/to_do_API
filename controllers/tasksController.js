const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/to_do/";
const Task = require("../models/task");

const getAllTasks = (req, res) => {
  console.log("Get all tasks");
  //   res.send("Get all tasks :) ").then(
  Task.find()
    .sort({ completionDate: -1 })
    .then((tasks) => {
      console.log(tasks);
      res.json(tasks);
    })
    .catch((err) => console.log(err));
};
module.exports = { getAllTasks };

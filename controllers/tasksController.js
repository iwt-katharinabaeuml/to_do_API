const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/to_do/";
const Task = require("../models/task");

const getAllTasks = (req, res) => {
  console.log("Get all tasks");
  //   res.send("Get all tasks :) ").then(
  Task.find()
    .sort({ completionDate: -1 })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => console.log(err));
};

// test in Postman with GET e.g.: http://localhost:3000/tasks/65a62f1672a61e589b45206e :

const getTaskById = (req, res) => {
  console.log("Get Task by ID :) ");
  const taskId = encodeURIComponent(req.params.id);
  console.log("task ID", taskId);
  Task.findById(taskId)
    .then((task) => {
      console.log(task);
      res.json(task);
    })
    .catch((err) => console.log(err));
};

// im Body der HTTP-Anfrage muss ein JSON mit den notwendigen Daten gesendet werden

const createTask = (req, res) => {
  console.log("Create Task :) ");
  let { description, creationDate, completionDate, priority, completed } =
    req.body;
  const newTask = new Task({
    description: description,
    creationDate: new Date(creationDate),
    completionDate: new Date(completionDate),
    priority: priority,
    completed: completed,
  });

  newTask
    .save()
    .then((savedTask) => {
      console.log("Task erfolgreich erstellt:", savedTask);
      res.status(201).json(savedTask);
    })
    .catch((err) => {
      console.error("Fehler beim Erstellen des Tasks:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// test in Postman with DELETE e.g.: http://localhost:3000/tasks/65a62f1672a61e589b45206e :
const deleteTaskById = (req, res) => {
  console.log("Delete Task by ID :) ");
  const taskId = encodeURIComponent(req.params.id);
  console.log("Task ID", taskId);

  Task.deleteOne({ _id: taskId })
    .then((result) => {
      if (result.deletedCount === 1) {
        console.log("task deleted");
        res.status(204).send();
      } else {
        console.log("task not found");
        res.status(404).json({ error: "task not found" });
      }
    })
    .catch((err) => {
      console.error("Fehler beim Löschen des Tasks:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// const updateTaskParts = (req, res) => {
//   console.log("Update Parts of a Task");
//   const taskId = encodeURIComponent(req.params.id);
//   console.log("Task ID", taskId);
//   let { description, creationDate, completionDate, priority, completed } =
//     req.body;
//   const filter = { _id: taskId };
//   const update = {};
// };

const updateTaskParts = async (req, res) => {
  console.log("Update the whole Task");
  const taskId = encodeURIComponent(req.params.id);
  let { description, creationDate, completionDate, priority, completed } =
    req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        description: description,
        creationDate: creationDate,
        completionDate: completionDate,
        priority: priority,
        completed: completed,
      },
      { new: true }
    );

    if (updatedTask) {
      console.log("Full task updated", updatedTask);
      res.status(200).json(updatedTask); // Status 200 "OK"
    } else {
      console.log("Task not found");
      res.status(404).json({ error: "Task not found" }); // Status 404 "Not Found"
    }
  } catch (err) {
    console.error("Could not be updated", err);
    res.status(500).json({ error: "Internal Server Error" }); // Status 500 "Internal Server Error"
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTaskById,
  updateTaskParts,
};

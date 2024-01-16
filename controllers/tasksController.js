const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/to_do/";
const Task = require("../models/task");

const getAllTasks = (req, res) => {
  Task.find()
    .sort({ completionDate: -1 })
    .then((tasks) => {
      if (tastjs.length === 0) {
        return res.status(404).send("No tasks found.");
      }
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
};

const getTaskById = (req, res) => {
  const taskId = encodeURIComponent(req.params.id);
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        return res.status(400).send("Task not found");
      }
      res.json(task);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
};

const createTask = (req, res) => {
  let { description, creationDate, completionDate, priority, completed } =
    req.body;

  if (!description) {
    res.status(400).send("Description is required!");
    return;
  }

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
      res.status(201).json(savedTask);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const deleteTaskById = (req, res) => {
  const taskId = encodeURIComponent(req.params.id);

  Task.deleteOne({ _id: taskId })
    .then((result) => {
      if (result.deletedCount === 1) {
        res.status(204);
      } else {
        console.log("task not found");
        res.status(404).send("task not found");
      }
    })
    .catch((err) => {
      console.error();
      res.status(500).send("Internal Server Error");
    });
};

const updateTotalTask = (req, res) => {
  const taskId = encodeURIComponent(req.params.id);
  const { description, creationDate, completionDate, priority, completed } =
    req.body;
  const updatedTasks = {
    description: description,
    creationDate: creationDate ? new Date(creationDate) : undefined,
    completionDate: completionDate ? new Date(completionDate) : undefined,
    priority: priority,
    completed: completed,
  };
  Task.findOneAndReplace({ _id: taskId }, updatedTasks, {
    new: true,
    useFindAndModify: false,
  })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found." });
      }
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error("Error updating total task:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error while updating total task." });
    });
};

const updateTaskParts = (req, res) => {
  console.log("Update parts (or everything)");
  const taskId = encodeURIComponent(req.params.id);
  let { description, creationDate, completionDate, priority, completed } =
    req.body;

  const updatedTasks = {
    description: description,
    creationDate: creationDate ? new Date(creationDate) : undefined,
    completionDate: completionDate ? new Date(completionDate) : undefined,
    priority: priority,
    completed: completed,
  };
  Task.findByIdAndUpdate(
    taskId,
    updatedTasks,
    { new: true } //{ new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).send("task not found");
      }

      res.json(updatedTask);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTaskById,
  updateTaskParts,
  updateTotalTask,
};

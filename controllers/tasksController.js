const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/to_do/";
const Task = require("../models/task");

const getAllTasks = (req, res) => {
  console.log("Get all tasks");
  Task.find()
    .sort({ completionDate: -1 })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => console.log(err));
};

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
      res.status(201).json(savedTask);
    })
    .catch((err) => {
      console.error(err);
      //   res.status(500).json({ error: "Internal Server Error" });
    });
};

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
        // res.status(404).json({ error: "task not found" });
      }
    })
    .catch((err) => {
      console.error();
      //   res.status(500).json({ error: "Internal Server Error" });
    });
};

const updateTotalTask = (req, res) => {
  console.log("Update Task (Total) :) ");
  const taskId = encodeURIComponent(req.params.id);
  const { description, creationDate, completionDate, priority, completed } =
    req.body;
  const defaultValues = new Task().toObject();
  const updatedFields = {
    description: description,
    creationDate: creationDate
      ? new Date(creationDate)
      : defaultValues.creationDate,
    completionDate: completionDate
      ? new Date(completionDate)
      : defaultValues.completionDate,
    priority: priority || defaultValues.priority,
    completed: completed !== undefined ? completed : defaultValues.completed,
  };
  Task.findOneAndUpdate({ _id: taskId }, updatedFields, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const updateTaskParts = (req, res) => {
  console.log("Update parts (or everything)");
  const taskId = encodeURIComponent(req.params.id);
  let { description, creationDate, completionDate, priority, completed } =
    req.body;

  const updatedTasks = {
    description: description,
    creationDate: new Date(creationDate),
    completionDate: new Date(completionDate),
    priority: priority,
    completed: completed,
  };
  Task.findByIdAndUpdate(
    taskId,
    updatedTasks,
    { new: true } //{ new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((updatedTask) => {
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
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

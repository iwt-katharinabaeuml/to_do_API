const router = require("express").Router();
const controller = require("../controllers/tasksController");

router.get("/tasks", controller.getAllTasks);

module.exports = router;

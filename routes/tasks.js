const router = require("express").Router();
const controller = require("../controllers/tasksController");

router.get("/tasks", controller.getAllTasks);
router.get("/tasks/:id", controller.getTaskById);
router.post("/tasks", controller.createTask);
router.delete("/tasks/:id", controller.deleteTaskById);
router.patch("/tasks/:id", controller.updateTaskParts);
module.exports = router;

const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { protect } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;

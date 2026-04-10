const Task = require("../models/Task");
const hasCycle = require("../utils/detectCycle");
const { getIO } = require("../config/socket");


// CREATE TASK

const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      estimatedHours,
      dependencies,
      projectId,
    } = req.body;

    const existingTasks = await Task.find({ projectId });

    const tempId = "temp_" + Date.now();

    // Cycle check
    if (hasCycle(existingTasks, tempId, dependencies || [])) {
      return res.status(400).json({ message: "Cycle detected!" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      estimatedHours,
      dependencies,
      projectId,
    });

    const io = getIO();
    io.to(projectId.toString()).emit("taskCreated", task);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


// GET TASKS

const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const incomingVersion = req.body.versionNumber;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Version check 
    if (incomingVersion !== task.versionNumber) {
      return res.status(409).json({
        message: "Version conflict. Please refresh.",
        latest: task,
      });
    }

    // Only update dependencies if provided
    const updatedDependencies =
      req.body.dependencies !== undefined
        ? req.body.dependencies
        : task.dependencies;

    const allTasks = await Task.find({ projectId: task.projectId });

    // Cycle detection
    if (hasCycle(allTasks, id, updatedDependencies)) {
      return res.status(400).json({ message: "Cycle detected!" });
    }

    // Apply updates
    Object.assign(task, req.body);
    task.versionNumber += 1;

    await task.save();

    // Emit socket event
    const io = getIO();
    io.to(task.projectId.toString()).emit("taskUpdated", task);

    res.json(task);
  } catch (error) {
    next(error);
  }
};


// DELETE TASK

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);

   
    const io = getIO();
    io.to(task.projectId.toString()).emit("taskDeleted", req.params.id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

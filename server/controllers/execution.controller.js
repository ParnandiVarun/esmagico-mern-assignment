const Task = require("../models/Task");
const {
  getBlockedTasks,

  computeExecutionPlan,
  simulateExecution,
} = require("../services/execution.service");

// Compute Execution Plan
const computeExecution = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tasks = await Task.find({ projectId: id });

    const blocked = getBlockedTasks(tasks);

    const filteredTasks = tasks.filter((t) => !blocked.has(t._id.toString()));

    const executionOrder = computeExecutionPlan(filteredTasks);

    res.json({
      executionOrder,
      blockedTasks: Array.from(blocked),
    });
  } catch (error) {
    next(error);
  }
};

// Simulation API
const simulate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { availableHours } = req.body;

    const tasks = await Task.find({ projectId: id });

    const result = simulateExecution(tasks, availableHours);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { computeExecution, simulate };

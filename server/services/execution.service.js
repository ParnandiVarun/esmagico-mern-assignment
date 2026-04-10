// Priority Sorting
const computeExecutionPlan = (tasks) => {
  const graph = {};
  const inDegree = {};
  const taskMap = {};

  // Initialize
  tasks.forEach((task) => {
    const id = task._id.toString();
    graph[id] = [];
    inDegree[id] = 0;
    taskMap[id] = task;
  });

  // Build graph
  tasks.forEach((task) => {
    const id = task._id.toString();

    task.dependencies.forEach((dep) => {
      const depId = dep.toString();
      graph[depId].push(id);
      inDegree[id]++;
    });
  });

  // Start with nodes having 0 indegree
  let queue = Object.keys(inDegree)
    .filter((id) => inDegree[id] === 0)
    .sort((a, b) => {
      return (
        taskMap[b].priority - taskMap[a].priority || // priority DESC
        taskMap[a].estimatedHours - taskMap[b].estimatedHours // hours ASC
      );
    });

  const result = [];

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(taskMap[current]);

    for (let neighbor of graph[current]) {
      inDegree[neighbor]--;

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }

    // Re-sort queue
    queue.sort((a, b) => {
      return (
        taskMap[b].priority - taskMap[a].priority ||
        taskMap[a].estimatedHours - taskMap[b].estimatedHours
      );
    });
  }

  return result;
};

const getBlockedTasks = (tasks) => {
  const failed = new Set(
    tasks.filter((t) => t.status === "Failed").map((t) => t._id.toString()),
  );

  const blocked = new Set();

  tasks.forEach((task) => {
    task.dependencies.forEach((dep) => {
      if (failed.has(dep.toString())) {
        blocked.add(task._id.toString());
      }
    });
  });

  return blocked;
};

const simulateExecution = (tasks, availableHours) => {
  const ordered = computeExecutionPlan(tasks);
  const blocked = getBlockedTasks(tasks);

  let usedHours = 0;

  const selected = [];
  const skipped = [];

  for (let task of ordered) {
    const id = task._id.toString();

    if (blocked.has(id)) continue;

    if (usedHours + task.estimatedHours <= availableHours) {
      selected.push(task);
      usedHours += task.estimatedHours;
    } else {
      skipped.push(task);
    }
  }

  const totalPriorityScore = selected.reduce((sum, t) => sum + t.priority, 0);

  return {
    executionOrder: ordered,
    selectedTasks: selected,
    blockedTasks: Array.from(blocked),
    skippedTasks: skipped,
    totalPriorityScore,
  };
};

module.exports = { computeExecutionPlan, simulateExecution, getBlockedTasks };

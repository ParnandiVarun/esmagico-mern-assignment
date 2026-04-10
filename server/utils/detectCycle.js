const hasCycle = (tasks, newTaskId, dependencies) => {
  const graph = {};

  tasks.forEach((task) => {
    graph[task._id] = task.dependencies.map((d) => d.toString());
  });

  graph[newTaskId] = dependencies.map((d) => d.toString());

  const visited = new Set();
  const recStack = new Set();

  const dfs = (node) => {
    if (!visited.has(node)) {
      visited.add(node);
      recStack.add(node);

      for (let neighbor of graph[node] || []) {
        if (!visited.has(neighbor) && dfs(neighbor)) return true;
        else if (recStack.has(neighbor)) return true;
      }
    }

    recStack.delete(node);
    return false;
  };

  return dfs(newTaskId);
};

module.exports = hasCycle;

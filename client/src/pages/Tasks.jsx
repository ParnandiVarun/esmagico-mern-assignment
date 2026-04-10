import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [dependencies, setDependencies] = useState([]);

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
    if (data.length > 0) setSelectedProject(data[0]._id);
  };

  const fetchTasks = async (projectId) => {
    if (!projectId) return;

    const { data } = await API.get(`/tasks/${projectId}`);
    setTasks(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks(selectedProject);
  }, [selectedProject]);

  const createTask = async () => {
    if (!title) return alert("Enter title");

    await API.post("/tasks", {
      title,
      priority,
      estimatedHours,
      dependencies,
      projectId: selectedProject,
    });

    setTitle("");
    setDependencies([]);

    fetchTasks(selectedProject);
  };

  const updateStatus = async (taskId, status, versionNumber) => {
    await API.put(`/tasks/${taskId}`, {
      status,
      versionNumber,
    });

    fetchTasks(selectedProject);
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    fetchTasks(selectedProject);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] p-6 border-r border-white/10">
        <h1 className="text-xl font-bold mb-6">collab_workflow</h1>

        <div className="space-y-3">
          <button
            className="w-full bg-white/10 p-2 rounded"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="w-full bg-white/10 p-2 rounded"
            onClick={() => navigate("/projects")}
          >
            Projects
          </button>
          <button className="w-full bg-blue-500 p-2 rounded">Tasks</button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="mb-6 p-2 bg-white/10 rounded"
        >
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        {/* CREATE TASK */}
        <div className="bg-white/5 p-4 rounded mb-6">
          <h2 className="mb-3 font-semibold">Create Task</h2>

          <div className="flex gap-3 flex-wrap">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded bg-white/10"
            />

            <input
              type="number"
              placeholder="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-2 rounded bg-white/10 w-24"
            />

            <input
              type="number"
              placeholder="Hours"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="p-2 rounded bg-white/10 w-24"
            />

            <button
              onClick={createTask}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {tasks.map((t) => (
            <div key={t._id} className="bg-white/10 p-4 rounded">
              <h3 className="font-bold">{t.title}</h3>

              <p>Priority: {t.priority}</p>
              <p>Status: {t.status}</p>

              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(t._id, "Done", t.versionNumber)}
                  className="bg-green-500 px-2 py-1 rounded"
                >
                  Done
                </button>

                <button
                  onClick={() =>
                    updateStatus(t._id, "Pending", t.versionNumber)
                  }
                  className="bg-yellow-500 px-2 py-1 rounded"
                >
                  Pending
                </button>

                <button
                  onClick={() => deleteTask(t._id)}
                  className="bg-red-500 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

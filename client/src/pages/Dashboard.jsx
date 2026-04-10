import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const [title, setTitle] = useState("");
  const [inviteToken, setInviteToken] = useState("");

  // Fetch Data
  const fetchData = async () => {
    try {
      const { data: projectData } = await API.get("/projects");
      setProjects(projectData);

      // optional: fetch tasks if needed
      try {
        const { data: taskData } = await API.get("/tasks/all");
        const safeTasks = Array.isArray(taskData)
          ? taskData
          : taskData.tasks || [];
        setTasks(safeTasks);
      } catch (err) {
        setTasks([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Create Project
  const createProject = async () => {
    try {
      if (!title) return alert("Enter project title");

      await API.post("/projects", { title });

      setTitle("");
      setShowCreate(false);

      alert("Project Created ✅");

      fetchData(); // refresh
      navigate("/projects");
    } catch (err) {
      console.error(err);
    }
  };

  //  Join Project
  const joinProject = async () => {
    try {
      if (!inviteToken) return alert("Enter invite token");

      await API.post("/projects/join", { inviteToken });

      setInviteToken("");
      setShowJoin(false);

      alert("Joined Project ");

      fetchData();
      navigate("/projects");
    } catch (err) {
      console.error(err);
    }
  };

  // Stats
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "Done").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Done").length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] p-6 border-r border-white/10">
        <h1 className="text-xl font-bold mb-6">collab_workflow</h1>

        <div className="space-y-3">
          <button className="w-full bg-blue-500 p-2 rounded">Dashboard</button>
          <button
            onClick={() => navigate("/projects")}
            className="w-full bg-white/10 p-2 rounded"
          >
            Projects
          </button>
          <button
            onClick={() => navigate("/tasks")}
            className="w-full bg-white/10 p-2 rounded"
          >
            Tasks
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome Back 👋</h1>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-white/10 rounded">
            Projects: {totalProjects}
          </div>
          <div className="p-4 bg-white/10 rounded">Tasks: {totalTasks}</div>
          <div className="p-4 bg-white/10 rounded">Done: {doneTasks}</div>
          <div className="p-4 bg-white/10 rounded">Pending: {pendingTasks}</div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-10 bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="flex gap-4">
            <button
              onClick={() => setShowCreate(true)}
              className="bg-blue-500 px-5 py-2 rounded"
            >
              + Create Project
            </button>

            <button
              onClick={() => setShowJoin(true)}
              className="bg-green-500 px-5 py-2 rounded"
            >
              Join via Invite Token
            </button>
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-[#0f172a] p-6 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">Create Project</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              className="w-full p-2 rounded bg-white/10 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={createProject}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Create
              </button>

              <button
                onClick={() => setShowCreate(false)}
                className="bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOIN MODAL */}
      {showJoin && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-[#0f172a] p-6 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">Join Project</h2>

            <input
              value={inviteToken}
              onChange={(e) => setInviteToken(e.target.value)}
              placeholder="Enter Invite Token"
              className="w-full p-2 rounded bg-white/10 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={joinProject}
                className="bg-green-500 px-4 py-2 rounded"
              >
                Join
              </button>

              <button
                onClick={() => setShowJoin(false)}
                className="bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

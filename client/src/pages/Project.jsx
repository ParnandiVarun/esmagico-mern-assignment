import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      if (!title) return alert("Enter project title");

      await API.post("/projects", { title });

      setTitle("");
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const joinProject = async () => {
    try {
      if (!token) return alert("Enter invite token");

      await API.post("/projects/join", { token });

      setToken("");
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* CREATE + JOIN */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Project"
          className="p-3 rounded bg-white/10 border border-white/10"
        />

        <button
          onClick={createProject}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>

        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Invite Token"
          className="p-3 rounded bg-white/10 border border-white/10"
        />

        <button
          onClick={joinProject}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Join
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/projects/${p._id}`)}
          >
            <h2 className="text-lg font-semibold">{p.title}</h2>

            {/* INVITE TOKEN */}
            <div className="mt-3 text-sm">
              <p className="text-gray-400">Invite Token:</p>

              <div className="flex justify-between items-center mt-1">
                <span className="text-blue-400">{p.inviteToken}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(p.inviteToken);
                  }}
                  className="text-xs bg-white/10 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

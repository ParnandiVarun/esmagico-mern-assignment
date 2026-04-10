import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [inviteToken, setInviteToken] = useState("");

  const navigate = useNavigate();

  //  Fetch projects
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  //  Create Project
  const createProject = async () => {
    if (!title) return alert("Enter project title");

    try {
      await API.post("/projects", { title });
      setTitle("");
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Join Project
  const joinProject = async () => {
    if (!inviteToken) return alert("Enter invite token");

    try {
      await API.post("/projects/join", { inviteToken });
      setInviteToken("");
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {/* CREATE + JOIN */}
      <div className="flex gap-4 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Project"
          className="px-4 py-2 rounded bg-white/10 border border-white/20"
        />
        <button
          onClick={createProject}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>

        <input
          value={inviteToken}
          onChange={(e) => setInviteToken(e.target.value)}
          placeholder="Invite Token"
          className="px-4 py-2 rounded bg-white/10 border border-white/20"
        />
        <button
          onClick={joinProject}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Join
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/projects/${p._id}`)}
            className="p-4 bg-white/10 rounded cursor-pointer hover:bg-white/20"
          >
            <h2 className="font-semibold text-lg">{p.title}</h2>
            <p className="text-sm text-gray-300">Token: {p.inviteToken}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

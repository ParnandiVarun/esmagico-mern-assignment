import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold tracking-wide">collab_workflow</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="border px-4 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">
          Build. Collaborate. Execute.
        </h1>

        <p className="text-gray-400 max-w-xl mb-6">
          A powerful workflow orchestration platform where teams plan, execute
          and simulate tasks seamlessly with real-time collaboration.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 px-6 py-3 rounded text-lg hover:scale-105 transition"
        >
          Get Started 🚀
        </button>
      </div>

      {/* ANIMATED WORKFLOW SECTION */}
      <div className="mt-24 px-10 grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-gray-900 rounded shadow hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">👥 Team Collaboration</h2>
          <p className="text-gray-400">
            Work together in real-time with seamless synchronization.
          </p>
        </div>

        <div className="p-6 bg-gray-900 rounded shadow hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">🔗 Smart Dependencies</h2>
          <p className="text-gray-400">
            Build task relationships with intelligent dependency tracking.
          </p>
        </div>

        <div className="p-6 bg-gray-900 rounded shadow hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">⚡ Execution Engine</h2>
          <p className="text-gray-400">
            Run optimized workflows using advanced execution planning.
          </p>
        </div>
      </div>

      {/* VISUAL FLOW (ANIMATED DOTS) */}
      <div className="mt-20 flex justify-center items-center gap-6">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-1 bg-gray-600"></div>
        <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-1 bg-gray-600"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      {/* QUOTES SECTION */}
      <div className="mt-24 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">What Teams Say 💬</h2>

        <p className="text-gray-400 italic max-w-2xl mx-auto">
          “This platform completely changed how we manage workflows. The
          dependency tracking and simulation features are game-changers.”
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-20 text-center text-gray-500 text-sm pb-6">
        © 2026 collab_workflow — Built for smarter teams 🚀
      </div>
    </div>
  );
}

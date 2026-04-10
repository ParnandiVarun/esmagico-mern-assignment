import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/dashboard" },
    { name: "Tasks", path: "/tasks" },
  ];

  return (
    <div className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6">
      {/* LOGO */}
      <h1 className="text-xl font-bold mb-10 tracking-wide">collab_workflow</h1>

      {/* MENU */}
      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
              pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

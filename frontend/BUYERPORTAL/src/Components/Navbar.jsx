import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-amber-400"
      : "text-stone-400 hover:text-stone-200";

  return (
    <nav className="bg-stone-900 border-b border-stone-800 px-4 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-amber-400 font-serif text-xl tracking-widest uppercase"
        >
          Nestly
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className={`text-sm transition ${isActive("/dashboard")}`}>
            Dashboard
          </Link>
          <Link to="/properties" className={`text-sm transition ${isActive("/properties")}`}>
            Properties
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-stone-400 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
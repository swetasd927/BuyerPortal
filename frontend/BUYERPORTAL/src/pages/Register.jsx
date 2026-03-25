import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import api from "../api/axios";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3b2f1e_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="mb-10 text-center">
          <span className="text-amber-400 text-4xl font-serif tracking-widest uppercase">Nestly</span>
          <p className="text-stone-500 text-sm mt-1 tracking-wider">Real Estate Buyer Portal</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-stone-100 text-2xl font-semibold mb-1">Create account</h2>
          <p className="text-stone-500 text-sm mb-6">Start finding your dream property</p>

          {error && (
            <div className="bg-red-950 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition placeholder-stone-600"
              />
            </div>

            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition placeholder-stone-600"
              />
            </div>

            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Min 6 characters"
                className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition placeholder-stone-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 disabled:cursor-not-allowed text-stone-950 font-semibold py-3 rounded-lg transition text-sm tracking-wide mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-stone-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
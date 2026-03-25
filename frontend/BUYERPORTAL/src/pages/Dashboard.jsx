import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import api from "../api/axios";

import Navbar from "../Components/Navbar";

export default function Dashboard() {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  const fetchFavourites = async () => {
    try {
      const { data } = await api.get("/favourites");
      setFavourites(data.favourites);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleRemove = async (propertyId) => {
    setRemoving(propertyId);
    try {
      await api.delete(`/favourites/${propertyId}`);
      setFavourites((prev) =>
        prev.filter((f) => f.property._id !== propertyId)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setRemoving(null);
    }
  };

  const propertyTypeColor = {
    apartment: "bg-blue-900 text-blue-300",
    house: "bg-green-900 text-green-300",
    villa: "bg-purple-900 text-purple-300",
    land: "bg-yellow-900 text-yellow-300",
    commercial: "bg-orange-900 text-orange-300",
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* User info card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 text-xl font-bold flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-stone-100">{user?.name}</h1>
            <p className="text-stone-400 text-sm">{user?.email}</p>
            <span className="inline-block mt-1 text-xs uppercase tracking-widest bg-amber-900 text-amber-400 px-2 py-0.5 rounded">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Favourites section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-stone-200">
            My Favourites
            <span className="ml-2 text-sm text-stone-500 font-normal">
              ({favourites.length})
            </span>
          </h2>
          <Link
            to="/properties"
            className="text-sm text-amber-400 hover:text-amber-300 transition border border-amber-800 hover:border-amber-600 px-4 py-1.5 rounded-lg"
          >
            Browse Properties
          </Link>
        </div>

        {loading ? (
          <div className="text-stone-500 text-sm">Loading favourites...</div>
        ) : favourites.length === 0 ? (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-10 text-center">
            <p className="text-stone-400 mb-4">No favourites yet.</p>
            <Link
              to="/properties"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favourites.map(({ property }) => (
              <div
                key={property._id}
                className="bg-stone-900 border border-stone-800 rounded-xl p-5 flex flex-col gap-3 hover:border-stone-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-stone-100 font-medium leading-snug">
                    {property.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded capitalize flex-shrink-0 ${
                      propertyTypeColor[property.type] || "bg-stone-800 text-stone-400"
                    }`}
                  >
                    {property.type}
                  </span>
                </div>
                <p className="text-stone-400 text-sm">📍 {property.location}</p>
                <p className="text-amber-400 font-semibold text-sm">
                  Rs. {property.price.toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemove(property._id)}
                  disabled={removing === property._id}
                  className="mt-auto text-sm text-red-400 hover:text-red-300 border border-red-900 hover:border-red-700 py-1.5 rounded-lg transition disabled:opacity-50"
                >
                  {removing === property._id ? "Removing..." : "Remove"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
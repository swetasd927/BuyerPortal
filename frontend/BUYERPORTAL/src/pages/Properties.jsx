import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../Components/Navbar";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);
  const [toast, setToast] = useState("");
  const [seeding, setSeeding] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchData = async () => {
    try {
      const [propRes, favRes] = await Promise.all([
        api.get("/properties"),
        api.get("/favourites"),
      ]);
      setProperties(propRes.data.properties);
      const ids = new Set(favRes.data.favourites.map((f) => f.property._id));
      setFavouriteIds(ids);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post("/properties/seed");
      showToast("Properties seeded successfully!");
      await fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || "Seeding failed");
    } finally {
      setSeeding(false);
    }
  };

  const handleToggle = async (propertyId) => {
    setToggling(propertyId);
    const isFav = favouriteIds.has(propertyId);
    try {
      if (isFav) {
        await api.delete(`/favourites/${propertyId}`);
        setFavouriteIds((prev) => {
          const next = new Set(prev);
          next.delete(propertyId);
          return next;
        });
        showToast("Removed from favourites");
      } else {
        await api.post(`/favourites/${propertyId}`);
        setFavouriteIds((prev) => new Set([...prev, propertyId]));
        showToast("Added to favourites ♥");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong");
    } finally {
      setToggling(null);
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

      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-stone-800 border border-stone-700 text-stone-100 text-sm px-5 py-2.5 rounded-full shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-stone-100">Properties</h1>
            <p className="text-stone-500 text-sm mt-1">Browse and save your favourites</p>
          </div>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="text-sm px-4 py-2 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 hover:bg-stone-700 transition disabled:opacity-50"
          >
            {seeding ? "Seeding..." : "Seed Properties"}
          </button>
        </div>

        {loading ? (
          <div className="text-stone-500 text-sm">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-10 text-center text-stone-400">
            No properties found.{" "}
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="underline text-amber-400 hover:text-amber-300 disabled:opacity-50"
            >
              {seeding ? "Seeding..." : "Click here to seed"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => {
              const isFav = favouriteIds.has(property._id);
              return (
                <div
                  key={property._id}
                  className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl p-5 flex flex-col gap-3 transition"
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

                  {property.description && (
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {property.description}
                    </p>
                  )}

                  <p className="text-stone-400 text-sm">📍 {property.location}</p>
                  <p className="text-amber-400 font-semibold text-sm">
                    Rs. {property.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleToggle(property._id)}
                    disabled={toggling === property._id}
                    className={`mt-auto py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 ${
                      isFav
                        ? "bg-red-950 border border-red-800 text-red-300 hover:bg-red-900"
                        : "bg-amber-500 hover:bg-amber-400 text-stone-950"
                    }`}
                  >
                    {toggling === property._id
                      ? "..."
                      : isFav
                      ? "♥ Saved"
                      : "Save"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

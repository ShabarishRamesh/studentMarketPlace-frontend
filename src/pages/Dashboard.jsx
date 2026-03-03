import { auth } from "../firebase";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user); // dynamically update user
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const res = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="p-7 pt-0 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      {/* HEADER */}
      <div className="text-center pt-16 px-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
          Welcome back👋 {firebaseUser?.displayName || "Guest"}
        </h1>

        <p className="text-gray-600 text-lg">
          Manage your products and explore the marketplace
        </p>
      </div>

      {/* CARDS */}
      <div className="flex justify-center mt-14 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* VIEW PRODUCTS */}
          <div className="group bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-center w-80 border border-gray-200 hover:scale-105 transition-all duration-300">

            <div className="text-4xl mb-4">📦</div>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              View Products
            </h2>

            <p className="text-gray-500 mb-6">
              Browse all available products in marketplace
            </p>

            <button
              onClick={() => navigate("/products")}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-blue-400/50 hover:scale-105 transition-all duration-300"
            >
              Explore
            </button>
          </div>

          {/* ADD PRODUCT */}
          <div className="group bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-center w-80 border border-gray-200 hover:scale-105 transition-all duration-300">

            <div className="text-4xl mb-4">➕</div>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Add Product
            </h2>

            <p className="text-gray-500 mb-6">
              List a new item and start selling instantly
            </p>

            <button
              onClick={() => navigate("/addproduct")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-green-400/50 hover:scale-105 transition-all duration-300"
            >
              Add Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
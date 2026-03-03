import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    // Notify other components (optional)
    window.dispatchEvent(new Event("storage")); 
  };

  // Listen for login/logout dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">

      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        StudentMarketPlace 🛒
      </h1>

      {/* RIGHT SIDE */}
      {!isLoggedIn ? (
        <div className="flex gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:scale-105 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:scale-105 transition"
          >
            Signup
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold"
          >
            Dashboard
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="bg-black px-4 py-2 rounded-lg"
            >
              Menu ▼
            </button>

            {open && (
              <div className="absolute z-100 right-0 mt-2 bg-white text-black shadow-xl rounded w-48 overflow-hidden">
                
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  onClick={() => go("/home")}
                >
                  🏡 Home
                </button>
                
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  onClick={() => go("/cart")}
                >
                  🛒 Cart
                </button>

                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  onClick={() => go("/search")}
                >
                  🔍 Search Products
                </button>

                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  onClick={() => go("/products")}
                >
                  📦 View Products
                </button>

                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  onClick={() => go("/addproduct")}
                >
                  ➕ Add Product
                </button>

                <button
                  className="block w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                  onClick={logout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
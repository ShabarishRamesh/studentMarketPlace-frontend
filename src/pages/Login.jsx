import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import API from "../api/axios"; // Axios instance with Authorization header

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Stay logged in if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Email and password are required");
    }

    try {
      setLoading(true);

      // 1️⃣ Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // 2️⃣ Get Firebase ID token
      const firebaseToken = await userCredential.user.getIdToken();

      // 3️⃣ Send token to backend
      const res = await API.post("auth/login", { token: firebaseToken });

      // 4️⃣ Store backend JWT
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      navigate("/home");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message + ". Please sign up if you don't have an account.");
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          className="w-full p-2 border mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 border mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:scale-105 transition-transform duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import API from "../api/axios"; // Axios instance with Authorization header

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Stay logged in if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      // 1️⃣ Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // 2️⃣ Update display name
      await updateProfile(userCredential.user, { displayName: form.name });

      // 3️⃣ Get Firebase ID token
      const firebaseToken = await userCredential.user.getIdToken();

      // 4️⃣ Send to backend (MongoDB) with Firebase token
      const res = await API.post(
        "/auth/firebase-login",
        { token: firebaseToken }
      );

      // 5️⃣ Store backend JWT in localStorage
      localStorage.setItem("token", res.data.token);

      alert("Signup successful! You are now logged in.");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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
          className="w-full bg-purple-500 text-white p-2 rounded hover:scale-105 transition-transform duration-300"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Login successful");
        console.log("Login successful, redirecting to dashboard...");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-emerald-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4 text-indigo-800">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button className="bg-indigo-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const refresh_token = location.state?.refresh_token;

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    if (!password || !confirmPassword) {
      setMsg("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/newpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, refresh_token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMsg(data.message || "Failed to reset password");
      } else {
        setMsg("Password reset successful!");
        setTimeout(() => navigate("/login", { state: { message: "Password reset successful! Please login." } }), 1500);
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!refresh_token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-emerald-400 to-purple-400">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-lg text-red-600">Invalid or expired session.</p>
          <Link to="/forgot-password" className="text-emerald-600 hover:underline block mt-4">
            Go back to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-emerald-400 to-purple-400 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src="https://themewagon.github.io/FoodMart/images/logo.png"
            alt="Logo"
            className="h-16 object-contain"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow">
          Set New Password
        </h2>
        <p className="mt-2 text-center text-md text-emerald-100">
          Enter your new password below.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl">
          <form className="space-y-6" onSubmit={handleReset}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-700">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-emerald-400 rounded-md shadow-sm placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-emerald-400 rounded-md shadow-sm placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-semibold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
            {msg && (
              <div className="text-center text-sm text-gray-700">{msg}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
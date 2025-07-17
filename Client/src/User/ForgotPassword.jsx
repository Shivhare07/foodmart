import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMsg(data.message || "Failed to send OTP");
      } else {
        setMsg("OTP sent to your email.");
        navigate("/verify-otp", { state: { token: data.token } });
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-md text-emerald-100">
          Enter your registered email to receive an OTP.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl">
          <form className="space-y-6" onSubmit={handleForgot}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
            {msg && (
              <div className="text-center text-sm text-gray-700">{msg}</div>
            )}
            <div className="text-center mt-2">
              <Link to="/login" className="text-emerald-600 hover:underline text-sm">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
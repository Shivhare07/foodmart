import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.state?.token;

  const handleVerify = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMsg(data.message || "OTP verification failed");
      } else {
        setMsg("OTP verified!");
        navigate("/new-password", { state: { refresh_token: data.refresh_token } });
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-emerald-400 to-purple-400">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-lg text-red-600">Invalid or expired OTP session.</p>
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
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-md text-emerald-100">
          Enter the OTP sent to your email.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl">
          <form className="space-y-6" onSubmit={handleVerify}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-indigo-700">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={e => setOtp(e.target.value)}
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
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
            {msg && (
              <div className="text-center text-sm text-gray-700">{msg}</div>
            )}
            <div className="text-center mt-2">
              <Link to="/forgot-password" className="text-emerald-600 hover:underline text-sm">
                Back to Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
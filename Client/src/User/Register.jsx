import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    profileImage: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("input[name='firstName']")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData(prev => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, password, confirmPassword, number, profileImage } = formData;
    const name = `${firstName} ${lastName}`;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !number) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);
      form.append("number", number);
      if (profileImage) form.append("profileImage", profileImage);

      const response = await fetch("/api/user/register", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed.");
      } else {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Registration successful! Please login." }
          });
        }, 1500);
      }
    } catch {
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-emerald-400 to-purple-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <img
            src="https://themewagon.github.io/FoodMart/images/logo.png"
            alt="Logo"
            className="mx-auto h-14"
          />
          <h2 className="mt-4 text-2xl font-bold text-indigo-700">Create Your Account</h2>
          <p className="mt-1 text-sm text-emerald-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-indigo-700">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-emerald-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 sm:text-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-indigo-700">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-emerald-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-emerald-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700">Mobile Number</label>
            <input
              name="number"
              type="tel"
              value={formData.number}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-emerald-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 sm:text-sm"
            />
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label className="block text-sm font-medium text-indigo-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-emerald-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 sm:text-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-emerald-600 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Confirm Password with Toggle */}
          <div>
            <label className="block text-sm font-medium text-indigo-700">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-emerald-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 sm:text-sm"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-sm text-emerald-600 cursor-pointer"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              Profile Image <span className="text-xs text-gray-500">(optional)</span>
            </label>
            <input
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold bg-emerald-500 hover:bg-emerald-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

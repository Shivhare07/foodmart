import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    fetchUserProfile();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        withCredentials: true,
      });
      setUser(res.data.data);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/user/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-indigo-700 shadow-sm py-4 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="https://themewagon.github.io/FoodMart/images/logo.png"
            alt="FOODMART Logo"
            className="h-20 w-48 object-contain"
          />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-grow max-w-2xl w-full">
          <select className="border border-emerald-400 rounded-l-md px-3 text-sm text-indigo-700 bg-emerald-50">
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for more than 20,000 products"
            className="flex-grow border-t border-b border-emerald-400 px-4 py-2 text-sm text-indigo-900 bg-emerald-50 placeholder-indigo-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-emerald-400 hover:bg-emerald-300 px-4 rounded-r-md flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        {/* Navigation Links and Profile */}
        <div className="flex items-center space-x-6 relative" ref={dropdownRef}>
          <NavLink to="/" className="text-md font-semibold text-emerald-100 hover:text-emerald-300 transition">
            Home
          </NavLink>
          <NavLink to="/cart" className="text-md font-semibold text-emerald-100 hover:text-emerald-300 transition">
            Cart
          </NavLink>

          {!loading && isLoggedIn && user ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="block w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow focus:outline-none"
              >
                <img
                  src={
                    user.image?.path
                      ? user.image.path
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                  <NavLink
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : !loading ? (
            <NavLink
              to="/login"
              className="text-md font-semibold text-emerald-100 hover:text-emerald-300 transition"
            >
              Login
            </NavLink>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

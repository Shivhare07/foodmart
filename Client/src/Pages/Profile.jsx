import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Profilepage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          withCredentials: true, 
        });
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-2xl">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-blue-500 text-xl font-semibold">
              Loading profile...
            </div>
          ) : !user ? (
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-red-500 text-xl font-semibold">
              User not found or not logged in.
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 shadow-lg mb-6">
                <img
                  src={
                    user.image?.path
                      ? user.image.path
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-blue-700 mb-2">{user.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{user.email}</p>

              <div className="w-full flex flex-col items-center gap-4">
                <div className="flex w-full max-w-md justify-between bg-blue-100 rounded-lg px-6 py-3 shadow">
                  <span className="font-semibold text-blue-700">User ID:</span>
                  <span className="text-blue-600 break-all">{user._id}</span>
                </div>
                <div className="flex w-full max-w-md justify-between bg-blue-100 rounded-lg px-6 py-3 shadow">
                  <span className="font-semibold text-blue-700">Registered:</span>
                  <span className="text-blue-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* 🔴 Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

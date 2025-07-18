import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, isAuthenticated: false });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get("/api/user/profile", {
          withCredentials: true, // ✅ important for cookies
        });
        setAuth({ loading: false, isAuthenticated: true });
      } catch (error) {
        setAuth({ loading: false, isAuthenticated: false });
      }
    };

    verifyUser();
  }, []);

  if (auth.loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold text-blue-600">
        Verifying user...
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/product/", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/user/allusers", {
          withCredentials: true,
        }),
      ]);

      const products = productsRes.data?.data || []; // <-- FIXED: use .data
      const users = usersRes.data?.data || [];       // <-- FIXED: use .data

      setStats({
        totalProducts: products.length,
        totalUsers: users.length,
      });
    } catch (err) {
      console.error("Error fetching dashboard data", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Admin Dashboard</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-blue-100 text-blue-800 p-8 rounded-xl shadow flex flex-col items-center">
              <span className="text-5xl mb-2">📦</span>
              <h2 className="text-xl font-semibold">Total Products</h2>
              <p className="text-4xl font-bold mt-2">{stats.totalProducts}</p>
            </div>

            <div className="bg-green-100 text-green-800 p-8 rounded-xl shadow flex flex-col items-center">
              <span className="text-5xl mb-2">👤</span>
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

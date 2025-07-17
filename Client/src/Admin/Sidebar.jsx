import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true });
    toast.success("Logged out");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col justify-between shadow-lg">
      <div className="p-6 space-y-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-blue-300 transition">
          <span>🏠</span> Dashboard
        </Link>
        <Link to="/admin/products" className="flex items-center gap-2 hover:text-blue-300 transition">
          <span>📦</span> All Products
        </Link>
        <Link to="/admin/products/add" className="flex items-center gap-2 hover:text-blue-300 transition">
          <span>➕</span> Add Product
        </Link>
        <Link to="/admin/users" className="flex items-center gap-2 hover:text-blue-300 transition">
          <span>👤</span> All Users
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="p-5 text-left bg-red-600 hover:bg-red-700 font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
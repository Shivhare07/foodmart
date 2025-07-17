import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./Admin/AdminRoute";
import LandingPage from './Pages/LandingPage';
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import AllProducts from "./Admin/AllProduct";
import AddProduct from "./Admin/AddProduct";
import EditProduct from "./Admin/EditProduct";
import AllUsers from "./Admin/AllUsers";
import Login from "./User/Login";
import Register from "./User/Register";
import ForgotPassword from "./User/ForgotPassword";
import VerifyOtp from "./User/VerifyOtp";
import NewPassword from "./User/NewPassword";
import Cart from "./Pages/Cart";
import Profilepage from "./Pages/Profile";
import ProtectedRoute from "./User/UserRoutes";
import FilterPage from "./Pages/FilterPage";
import ProductDetail from "./Components/ProductDetail"
import SearchResults from "./Components/SearchResults";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/filter/:category" element={<FilterPage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profilepage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    review: "",
    rating: "",
    isTrending: false,
    isPopular: false,
  });

  const [image, setImage] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/get/${id}`, {
        withCredentials: true,
      });

      if (!res.data.data) {
        toast.error("Product not found");
        navigate("/admin/products");
        return;
      }

      const product = res.data.data;
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        review: product.review || "",
        rating: product.rating || "",
        isTrending: product.isTrending || false,
        isPopular: product.isPopular || false,
      });
    } catch (error) {
      toast.error("Failed to fetch product");
      navigate("/admin/products");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files) {
      setImage(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });
      if (image) {
        data.append("image", image);
      }

      await axios.put(`/api/product/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Snack">Snack</option>
              <option value="Drink">Drink</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Sweets">Sweets</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Review (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review (Optional)</label>
            <input
              type="text"
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Rating (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (out of 5) (Optional)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
              />
              Trending
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
              />
              Popular
            </label>
          </div>

          {/* File Upload (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image (Optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full font-semibold text-lg transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;

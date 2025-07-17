import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdded = cart.some(item => item._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/get/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (isAdded) {
      toast.error("Product already in cart");
      return;
    }
    addToCart(product, 1);
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-6 text-center text-red-500">Product not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <img
            src={
              product.image?.path ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}`
            }
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}`;
            }}
            alt={product.name}
            className="w-full md:w-64 h-64 object-contain border rounded-xl"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-yellow-500 text-sm mb-2">
              ★ {product.rating || 4.5}
            </p>
            <p className="text-emerald-600 text-2xl font-semibold mb-4">
              ₹{product.price}
            </p>
            <p className="text-sm text-gray-700 mb-6">
              {product.description || "No description provided."}
            </p>

            <button
              className={`w-full md:w-auto px-6 py-2 rounded-lg text-white text-sm font-semibold transition ${
                isAdded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

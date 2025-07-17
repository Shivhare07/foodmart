import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../Components/ProductCard";
import { useCart } from "../Context/CartContext";

const categories = ["All", "Fruits", "Vegetable", "Drinks", "Snacks", "Dairy & Eggs"];

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/trending");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching trending products:", err);
        toast.error("Failed to load trending products 😓");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-600">Loading trending products...</div>;
  }

  return (
    <div className="px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Trending Products</h2>
        <div className="flex space-x-6 text-sm font-semibold border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-1 ${
                activeCategory === cat
                  ? "border-b-2 border-emerald-400 text-emerald-600"
                  : "text-gray-500"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;

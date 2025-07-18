import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../Components/ProductCard"; // adjust path if needed

const MostPopular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await axios.get("/api/product/popular");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to load popular products:", err);
        toast.error("Failed to load popular products 😓");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-600">Loading most popular...</div>;
  }

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Most Popular Brands</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MostPopular;

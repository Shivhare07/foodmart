import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../Components/ProductCard"; // adjust path if needed

const OurOfferings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product/");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching all products:", err);
        toast.error("Failed to load products 😓");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-600">Loading products...</div>;
  }

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Our Offerings</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OurOfferings;

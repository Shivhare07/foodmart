import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import { useCart } from "../Context/CartContext";

const FilterPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/product/category/${category}`
        );
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    if (addedToCart[product._id]) {
      toast.error("This product is already in your cart");
      return;
    }

    try {
      addToCart(product, 1);
      setAddedToCart((prev) => ({ ...prev, [product._id]: true }));
      toast.success("Product added to cart ✅");
    } catch (err) {
      toast.error("Something went wrong while adding to cart");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Products in: {category}
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={handleAddToCart}
                addedToCart={addedToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPage;

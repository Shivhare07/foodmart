import React from "react";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product, showDiscount = true }) => {
  const { cart, addToCart } = useCart();

  const isAdded = cart.some(item => item._id === product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault(); 

    if (isAdded) {
      toast.error("Product is already in cart");
      return;
    }

    addToCart(product, 1);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="block bg-white p-4 rounded-xl shadow-sm relative group hover:shadow-lg transition"
    >
      {/* Optional Discount Badge */}
      {product.discount && showDiscount && (
        <span className="absolute top-2 left-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded">
          {product.discount}
        </span>
      )}

      {/* Product Image */}
      <img
        src={
          product.image?.path ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}`
        }
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}`;
        }}
        alt={product.name}
        className="h-28 mx-auto object-contain mb-4"
      />

      {/* Name, Rating, Price */}
      <h3 className="text-sm font-semibold mb-1 truncate text-center">{product.name}</h3>
      <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
        <span>1 UNIT</span>
        <span className="text-yellow-500">★</span>
        <span className="font-semibold">{product.rating || 4.5}</span>
      </div>
      <p className="font-bold text-lg text-center">₹{product.price}</p>

      {/* Add to Cart Button */}
      <button
        className={`mt-2 w-full px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
          isAdded
            ? "bg-gray-400 text-white"
            : "bg-emerald-500 hover:bg-emerald-600 text-white"
        }`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </Link>
  );
};

export default ProductCard;

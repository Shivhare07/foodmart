import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage on initial mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  // ✅ Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    toast.success("Product added to cart ✅");
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
    toast.success("Item removed from cart");
  };

  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

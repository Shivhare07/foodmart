import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="text-emerald-600 hover:underline text-lg">
            Go shopping
          </Link>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center gap-6 border-b pb-6 last:border-b-0"
            >
              <img
                src={
                  item.image?.path ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`
                }
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`;
                }}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-xl border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    disabled={item.qty === 1}
                  >
                    −
                  </button>
                  <span className="font-medium">{item.qty}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => updateQty(item._id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">
                  ₹{item.price * item.qty}
                </p>
                <button
                  className="text-sm text-red-500 hover:underline mt-2"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6 border-t">
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold text-gray-800">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>

          <button
            className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-lg transition"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}

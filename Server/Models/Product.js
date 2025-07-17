const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  image: { filename: String, path: String },
  stock: { type: Number, min: 0 },
  review: { type: String },
  rating: { type: Number },
  isTrending: { type: Boolean, default: false }, // ✅ NEW
  isPopular: { type: Boolean, default: false },  // ✅ NEW
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;

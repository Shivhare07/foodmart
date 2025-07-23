const fs = require("fs");
const path = require("path");
const Product = require('../Models/Product');

// Create Product Controller
const createProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      stock,
      review,
      rating,
      isTrending,
      isPopular,
    } = req.body;

    let image = null;
    if (req.file) {
      image = {
        filename: req.file.filename,
        path: "https://foodmart-4p8z.onrender.com" + req.file.path,
      };
    }

    // ✅ Only validate required fields
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).send({
        success: false,
        message: "Name, price, description, category, and stock are required",
      });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
      review: review || "",         
      rating: rating || "",        
      isTrending: isTrending === "true", 
      isPopular: isPopular === "true",
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// Get All Products Controller
const getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({ success: true, message: "Products fetched successfully", data: products });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message || "Failed to fetch products" });
    }
};

// Get Product By ID Controller
const getProductByIdController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }
        res.status(200).send({ success: true, message: "Product fetched successfully", data: product });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message || "Failed to fetch product" });
    }
};

// Get product by Categories
const getProductsByCategoryController = async (req, res) => {
  try {
    const rawSlug = req.params.category;
    let category = rawSlug.replace(/-/g, " ").toLowerCase();

    // 👇 Convert specific cases to match DB
    if (category === "dairy and eggs") category = "dairy & eggs"; // only if DB has '&'

    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });

    res.status(200).send({ success: true, data: products });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Update Product Controller
const updateProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      stock,
      review,
      rating,
      isTrending,
      isPopular,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (stock !== undefined) updateData.stock = stock;
    if (review !== undefined) updateData.review = review;
    if (rating !== undefined) updateData.rating = rating;
    if (isTrending !== undefined) updateData.isTrending = isTrending === "true";
    if (isPopular !== undefined) updateData.isPopular = isPopular === "true";

    if (req.file) {
      // ✅ Delete old image file if it exists
      if (product.image?.path) {
        const oldImagePath = path.resolve("public", product.image.path.replace("http://localhost:5000/", ""));
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err);
          }
        });
      }

      updateData.image = {
        filename: req.file.filename,
        path: "https://foodmart-4p8z.onrender.com" + req.file.path,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

// Delete Product Controller
const deleteProductController = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }
        res.status(200).send({ success: true, message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message || "Failed to delete product" });
    }
};

// TrendingProduct Controller
const getTrendingProductsController = async (req, res) => {
    try {
        const products = await Product.find({ isTrending: true });
        res.status(200).send({ success: true, message: "Trending products", data: products });
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to fetch trending products" });
    }
};

// PopularProduct Controller
const getPopularProductsController = async (req, res) => {
    try {
        const products = await Product.find({ isPopular: true });
        res.status(200).send({ success: true, message: "Popular products", data: products });
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to fetch popular products" });
    }
};

// SearchProduct Controller
const SearchProductController = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Query required" });

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .limit(20)
      .sort({ name: 1 });

    res.status(200).json({ data: results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
};



module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    getTrendingProductsController,
    getPopularProductsController,
    getProductsByCategoryController,
    SearchProductController
};
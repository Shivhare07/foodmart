import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";

const SearchResults = () => {
  const { search } = useLocation(); // grabs ?q=something
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data.data || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) searchProducts();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">
          Search results for: <span className="text-emerald-600">"{query}"</span>
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-red-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;

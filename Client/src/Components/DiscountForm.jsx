import React, { useState } from 'react';

export default function DiscountForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-emerald-50 to-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-6xl flex flex-col md:flex-row gap-10 items-center border-2 border-gray-200">
        
        {/* Left: Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-indigo-700">
            Get <span className="text-emerald-500">25%</span><br />
            <span className="text-emerald-500">Discount</span> on your<br />
            first purchase
          </h1>
          <p className="text-slate-600 mt-4 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Dictumst amet, metus, sit massa posuere maecenas. At
            tellus ut nunc amet vel egestas.
          </p>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4 w-full">
          <div>
            <label className="block text-sm text-indigo-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 bg-gray-50 placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm text-indigo-800 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="abc@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 bg-gray-50 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="mr-2 accent-emerald-500"
            />
            <label htmlFor="subscribe" className="text-sm text-slate-700">
              Subscribe to the newsletter
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

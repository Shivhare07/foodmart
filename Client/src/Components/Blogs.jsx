export default function Blogs() {
  const blogs = [
    {
      img: "https://themewagon.github.io/FoodMart/images/post-thumb-1.jpg",
      date: "📅 22 AUG 2021",
      category: "📁 TIPS & TRICKS",
      title: "Top 10 casual look ideas to dress up your kids",
      desc: "Discover stylish and comfortable outfit ideas for your kids. Perfect blends of casual and trendy, curated for daily fun and comfort.",
    },
    {
      img: "https://themewagon.github.io/FoodMart/images/post-thumb-2.jpg",
      date: "📅 25 AUG 2021",
      category: "📁 TRENDING",
      title: "Latest trends of wearing street wears supremely",
      desc: "Explore how to combine bold urban styles with day-to-day wear. Stay trendy while keeping it comfy and cool.",
    },
    {
      img: "https://themewagon.github.io/FoodMart/images/post-thumb-3.jpg",
      date: "📅 28 AUG 2021",
      category: "📁 INSPIRATION",
      title: "10 Different Types of comfortable clothes ideas for women",
      desc: "Elevate your wardrobe with these comfy and stylish fashion inspirations tailored for every woman.",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-10 bg-indigo-50">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow">
          Our Recent Blog
        </h2>
        <p className="text-md text-emerald-600">
          Stay updated with the latest trends and tips
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-emerald-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-5">
              <div className="flex justify-between text-sm text-emerald-600 mb-2">
                <span>{blog.date}</span>
                <span>{blog.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm">{blog.desc}</p>
              <div className="mt-4 text-right">
                <a
                  href="/blog-post"
                  className="text-sm font-medium text-emerald-600 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/all-articles"
          className="inline-block px-6 py-3 border border-emerald-500 text-emerald-600 font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition"
        >
          View All Articles
        </a>
      </div>
    </section>
  );
}

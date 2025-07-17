import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();

   const categories = [
  {
    name: "Fruits",
    slug: "fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Vegetable",
    slug: "vegetable",
    image: "https://kidlingoo.com/wp-content/uploads/vegetables_name_in_english_50.jpg",
  },
  {
    name: "Sweets",
    slug: "sweets",
    image: "https://tse4.mm.bing.net/th/id/OIP.53yAU2iJ5ZSKQwykODu0uAHaEJ?pid=Api&P=0&h=220",
  },
  {
    name: "Drinks",
    slug: "drinks",
    image: "https://wallpaperaccess.com/full/3410682.jpg",
  },
  {
    name: "Snacks",
    slug: "snacks",
    image: "https://lilluna.com/wp-content/uploads/2022/09/movie-night-charcuterie-board-resize-1.jpg",
  },
  {
    name: "Dairy & Eggs",
    slug: "dairy-and-eggs",  // 🔁 key change here
    image: "https://a-cut-above.b-cdn.net/wp-content/uploads/2020/12/dairy2-2048x1365.jpg",
  },
  {
    name: "Personal Care",
    slug: "personal-care",
    image: "https://hsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw79a16b42/images/large/Personal-Care-Bundle_10382b_OPT.jpg?sw=2700",
  },
];


  return (
    <div className="h-[350px] bg-red-50">
      <div className="max-w-screen-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Category</h2>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="pb-8"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.name}>
              <div
               onClick={() => navigate(`/filter/${cat.slug}`)}
                className="cursor-pointer w-40 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-500 hover:bg-green-50 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

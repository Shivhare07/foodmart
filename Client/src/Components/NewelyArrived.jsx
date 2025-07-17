import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
 
 
export default function NewlyArrived() {
    return (
        <>
 
            <div className="h-[350px] bg-red-50">
                <div className="max-w-screen-7xl mx-auto px-8 py-12">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Newly Arrived Brands
                        </h2>
                        <a
                            href="#"
                            className="text-base text-gray-500 hover:text-green-600 transition"
                        >
                            View All →
                        </a>
                    </div>
 
                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="pb-8"
                    >
                        {/* CARD 1 */}
                        <SwiperSlide>
                            <div className="flex justify-between items-center w-[300px] bg-white pt-3 rounded-lg p-6 shadow-md h-[150px] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                                <img
                                    src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/19a39b296963f02f6a8682cd6bfce048"
                                    alt="Dabur Honey"
                                    className="w-22 h-25 object-cover rounded-lg"
                                />
                                <div className="mx-4">
                                    <p className="text-xl text-gray-700 mb-1">Dabur Honey</p>
                                    <h4 className="text-[16px] font-bold text-gray-700">
                                        Pure and Natural honey for health and sweetness
                                    </h4>
                                </div>
                            </div>
                        </SwiperSlide>
 
                        {/* CARD 2 */}
                        <SwiperSlide>
                            <div className="flex justify-between items-center w-[300px] bg-white pt-3 rounded-lg p-6 shadow-md h-[150px] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                                <img
                                    src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2024/3/15/9303c928-3aef-417b-b16f-532404d5cd7b_coffee_CHKX9TDI3C_MN.png"
                                    alt="Bevzila Coffee"
                                    className="w-22 h-25 object-cover rounded-lg"
                                />
                                <div className="mx-4">
                                    <p className="text-xl text-gray-700 mb-1">Bevzila Coffee</p>
                                    <h4 className="text-[16px] font-bold text-gray-700">
                                        Bevzila Turkish hazelnut Flavoured Coffee
                                    </h4>
                                </div>
                            </div>
                        </SwiperSlide>
 
                        {/* CARD 3 */}
                        <SwiperSlide>
                            <div className="flex justify-between items-center w-[300px] bg-white pt-3 rounded-lg p-6 shadow-md h-[150px] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                                <img
                                    src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/1/11/ae752d73-263b-4958-9f3f-9c2e011546c5_259749_1.png"
                                    alt="Moms Magic"
                                    className="w-22 h-25 object-cover rounded-lg"
                                />
                                <div className="mx-4">
                                    <p className="text-xl text-gray-700 mb-1">Moms Magic</p>
                                    <h4 className="text-[16px] font-bold text-gray-700">
                                        Sunfeast Mom's Magic Rich Butter Biscuits
                                    </h4>
                                </div>
                            </div>
                        </SwiperSlide>
 
                        {/* CARD 4 */}
                        <SwiperSlide>
                            <div className="flex justify-between items-center w-[300px] bg-white pt-3 rounded-lg p-6 shadow-md h-[150px] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                                <img
                                    src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/3/15/06a89b71-9e9b-4c37-912b-923bef9ad2fc_15751_1.png"
                                    alt="Cashew"
                                    className="w-22 h-25 object-cover rounded-lg"
                                />
                                <div className="mx-4">
                                    <p className="text-xl text-gray-700 mb-1">Cashew</p>
                                    <h4 className="text-[16px] font-bold text-gray-700">
                                        Supreme Harvest Good Quality Cashews
                                    </h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div></>
    )
}
import React from 'react';
export default function Promo() {
    return (
        <section className="py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Luxa Dark Chocolate Banner */}
                    <div className="relative bg-[#f6eee5] rounded-lg p-8 flex items-center overflow-hidden">
                        <div className="max-w-[60%] h-[230px]">
                            <div className="text-orange-500 text-2xl mt-5 font-semibold mb-2">
                                Upto 25% Off
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">
                                Luxa Dark Chocolate
                            </h3>
                            <p className="text-gray-600 mb-4 text-lg">
                                Very tasty & creamy vanilla flavour creamy muffins.
                            </p>
                            <a
                                href="#"
                                className="inline-block bg-gray-900 text-white uppercase px-4 py-2 rounded hover:bg-gray-700 transition"
                            >
                                Show Now
                            </a>
                        </div>
                        <img
                            src="https://cdn1.simplychocolate.com/wcsstore/SimplyChocolate/images/catalog/16352021x.jpg?height=456&width=418&sharpen=a0.5,r1,t1&auto=webp"
                            alt="Luxa Dark Chocolate"
                            className="absolute left-107  w-32 md:w-80 rotate-[-7deg]"
                        />
                    </div>
 
                    {/* Creamy Muffins Banner */}
                    <div className="relative bg-[#e5f7fb] rounded-lg p-8 flex items-center overflow-hidden">
                        <div className="max-w-[60%]">
                            <div className="text-orange-500 text-2xl font-semibold mb-2">
                                Upto 25% Off
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">
                                Creamy Muffins
                            </h3>
                            <p className="text-gray-600 mb-4 text-lg">
                                Very tasty & creamy vanilla flavour creamy muffins.
                            </p>
                            <a
                                href="#"
                                className="inline-block bg-gray-900 text-white uppercase px-4 py-2 rounded hover:bg-gray-700 transition"
                            >
                                Show Now
                            </a>
                        </div>
                        <img
                            src="https://themewagon.github.io/FoodMart/images/ad-image-4.png"
                            alt="Creamy Muffins"
                            className="absolute right-12 bottom-5 w-38 md:w-65"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
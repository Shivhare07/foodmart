import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaAmazon } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-indigo-800 text-emerald-50 py-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-wrap justify-between gap-8">
                    {/* Logo & Social */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <div className="flex items-center mb-4">
                            <img
                                src="https://themewagon.github.io/FoodMart/images/logo.png"
                                alt="FOODMART Logo"
                                className="h-20 w-48 object-contain"
                            />
                        </div>
                        <div className="flex mt-4 space-x-4 text-emerald-200">
                            <a href="#" aria-label="Facebook" className="hover:text-emerald-400 transition">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-emerald-400 transition">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" aria-label="YouTube" className="hover:text-emerald-400 transition">
                                <FaYoutube size={24} />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-emerald-400 transition">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" aria-label="Amazon" className="hover:text-emerald-400 transition">
                                <FaAmazon size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4 text-emerald-300">Customer Service</h3>
                        <ul className="text-sm text-emerald-100 space-y-2">
                            <li><a href="#" className="hover:text-emerald-400">FAQ</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Contact</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Cookie Guidelines</a></li>
                            <li><a href="#" className="hover:text-emerald-400">Delivery Information</a></li>
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4 text-emerald-300">Subscribe Us</h3>
                        <p className="text-sm text-emerald-100 mb-4">
                            Subscribe to our newsletter to get updates about our grand offers.
                        </p>
                        <form className="flex" onSubmit={e => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border border-emerald-300 rounded-l-md text-sm text-indigo-900 placeholder-emerald-400 bg-emerald-50 focus:ring-emerald-400 focus:border-emerald-400"
                                required
                            />
                            <button className="px-4 py-2 bg-emerald-400 text-indigo-900 font-semibold rounded-r-md text-sm hover:bg-emerald-300 transition">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center text-sm text-emerald-200 space-y-1">
                    <p>© 2023 Foodmart. All rights reserved.</p>
                    <p>
                        Free HTML Template by <a href="#" className="text-emerald-300 hover:underline">TemplatesJungle</a> Distributed by <a href="#" className="text-emerald-300 hover:underline">ThemeWagon</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
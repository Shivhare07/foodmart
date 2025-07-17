import Blogs from "../Components/Blogs";
import Category from "../Components/Category";
import DiscountForm from "../Components/DiscountForm";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import MostPopular from "../Components/MostPopular";
import Navbar from "../Components/Navbar";
import NewlyArrived from "../Components/NewelyArrived";
import OurOfferings from "../Components/OurOfferings";
import PromoCards from "../Components/Promo";
import TrendingProducts from "../Components/Trending";

export default function LandingPage() {
    return(
        <>
        <Navbar/>
        <Hero/>
        <Category/>
        <NewlyArrived/>
        <TrendingProducts/>
        <MostPopular/>
        <PromoCards/>
        <DiscountForm/>
        <OurOfferings/>
        <Blogs/>
        <Footer/>
        </>
    )
}
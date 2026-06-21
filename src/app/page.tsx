import PromoStrip from "@/components/home/PromoStrip";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ShopByCategory from "@/components/home/ShopByCategory";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import BestSellers from "@/components/home/BestSellers";
import TrustBadges from "@/components/home/TrustBadges";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PromoStrip />
      <Navbar />
      <HeroBanner />
      <CategoryGrid />
      <ShopByCategory />
      <NewArrivals />
      <FeaturedCollection />
      <BestSellers />
      <TrustBadges />
      <Footer />
    </main>
  );
}

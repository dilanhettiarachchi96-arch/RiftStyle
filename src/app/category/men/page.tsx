import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoStrip from "@/components/home/PromoStrip";
import CategoryPageContent from "@/components/shop/CategoryPageContent";

export const metadata = {
  title: "Men's Collection — RiftStyle",
  description: "Shop modern men's fashion at RiftStyle.",
};

export default function MenPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <PromoStrip />
      <Navbar />
      <CategoryPageContent category="men" />
      <Footer />
    </main>
  );
}

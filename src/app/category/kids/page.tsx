import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoStrip from "@/components/home/PromoStrip";
import CategoryPageContent from "@/components/shop/CategoryPageContent";

export const metadata = {
  title: "Kids' Collection — RiftStyle",
  description: "Shop fun kids' fashion at RiftStyle.",
};

export default function KidsPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <PromoStrip />
      <Navbar />
      <CategoryPageContent category="kids" />
      <Footer />
    </main>
  );
}

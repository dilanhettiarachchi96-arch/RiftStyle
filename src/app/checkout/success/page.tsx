import Link from "next/link";
import PromoStrip from "@/components/home/PromoStrip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Order Placed — RiftStyle",
};

export default function OrderSuccessPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <PromoStrip />
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <svg className="w-10 h-10" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Order Placed!
          </h1>
          <p className="text-base mb-2" style={{ color: "#6B7280" }}>
            Thank you for shopping with RiftStyle.
          </p>
          <p className="text-sm mb-8" style={{ color: "#9ca3af" }}>
            We&apos;ve received your order and will get in touch shortly to confirm details.
            Estimated delivery: <span className="font-medium" style={{ color: "#1A1A1A" }}>2–4 business days</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3 text-sm font-semibold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-8 py-3 text-sm font-medium border transition-colors hover:bg-gray-50"
              style={{ borderColor: "#e5e7eb" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

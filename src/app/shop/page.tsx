"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import PromoStrip from "@/components/home/PromoStrip";
import { products } from "@/lib/mock-data";
import { Product } from "@/types";

const PAGE_SIZE = 12;

function ShopContent() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const badge = searchParams.get("badge");
  const sale = searchParams.get("sale");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const price = searchParams.get("price");
  const sort = searchParams.get("sort") || "newest";

  let filtered: Product[] = [...products];

  if (badge) filtered = filtered.filter((p) => p.badge === badge);
  if (sale) filtered = filtered.filter((p) => p.originalPrice);
  if (size) filtered = filtered.filter((p) => p.sizes.includes(size));
  if (color)
    filtered = filtered.filter((p) =>
      p.colors.some((c) => c.toLowerCase().includes(color.toLowerCase()))
    );
  if (price) {
    const [min, max] = price.split("-").map(Number);
    filtered = filtered.filter((p) => p.price >= min && p.price <= max);
  }

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

  const displayed = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = displayed.length < filtered.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          All Products
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Showing {displayed.length} of {filtered.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <Suspense>
          <FilterSidebar />
        </Suspense>

        <div className="flex-1">
          <ProductGrid products={displayed} cols={3} />

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-8 py-3 border text-sm font-medium tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
                style={{ borderColor: "#1A1A1A" }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <PromoStrip />
      <Navbar />
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}

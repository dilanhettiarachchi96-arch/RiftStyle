"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import { products as allProducts } from "@/lib/mock-data";
import { Category, Product } from "@/types";

const PAGE_SIZE = 12;

const categoryLabels: Record<Category, string> = {
  women: "Women's Collection",
  men: "Men's Collection",
  kids: "Kids' Collection",
};

const categoryDescriptions: Record<Category, string> = {
  women: "Elegant styles for every woman, every occasion.",
  men: "Modern fits crafted for the contemporary man.",
  kids: "Fun, colourful styles for little adventurers.",
};

interface CategoryPageContentProps {
  category: Category;
}

function Content({ category }: CategoryPageContentProps) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const price = searchParams.get("price");
  const sort = searchParams.get("sort") || "newest";

  let filtered: Product[] = allProducts.filter((p) => p.category === category);

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
      {/* Page header */}
      <div className="mb-10 border-b pb-8" style={{ borderColor: "#e5e7eb" }}>
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {categoryLabels[category]}
        </h1>
        <p style={{ color: "#6B7280" }}>{categoryDescriptions[category]}</p>
        <p className="text-sm mt-2" style={{ color: "#9ca3af" }}>
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

export default function CategoryPageContent({ category }: CategoryPageContentProps) {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading products...</div>}>
      <Content category={category} />
    </Suspense>
  );
}

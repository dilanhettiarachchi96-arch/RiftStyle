"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Blue", "Red", "Green", "Pink", "Navy", "Beige"];
const priceRanges = [
  { label: "Under Rs. 2,000", value: "0-2000" },
  { label: "Rs. 2,000 – 4,000", value: "2000-4000" },
  { label: "Rs. 4,000 – 6,000", value: "4000-6000" },
  { label: "Over Rs. 6,000", value: "6000-99999" },
];
const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const currentSize = searchParams.get("size") || "";
  const currentColor = searchParams.get("color") || "";
  const currentPrice = searchParams.get("price") || "";
  const currentSort = searchParams.get("sort") || "newest";

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A1A" }}>
          Sort By
        </h3>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("sort", opt.value)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                currentSort === opt.value ? "font-semibold" : ""
              }`}
              style={{
                color: currentSort === opt.value ? "#1A1A1A" : "#6B7280",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A1A" }}>
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => updateParam("size", size)}
              className={`px-3 py-1.5 text-xs border rounded-sm transition-all ${
                currentSize === size
                  ? "text-white border-black"
                  : "border-gray-300 hover:border-gray-500 text-gray-700"
              }`}
              style={currentSize === size ? { backgroundColor: "#1A1A1A" } : {}}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color filter */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A1A" }}>
          Color
        </h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => updateParam("color", color)}
              className="flex items-center gap-2 text-sm w-full text-left"
            >
              <span
                className={`w-3 h-3 rounded-full border ${
                  currentColor === color ? "ring-2 ring-offset-1 ring-black" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
              <span style={{ color: currentColor === color ? "#1A1A1A" : "#6B7280" }}>
                {color}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A1A" }}>
          Price Range
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => updateParam("price", range.value)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                currentPrice === range.value ? "font-semibold" : ""
              }`}
              style={{
                color: currentPrice === range.value ? "#1A1A1A" : "#6B7280",
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {(currentSize || currentColor || currentPrice) && (
        <button
          onClick={() => router.push("?")}
          className="text-xs underline"
          style={{ color: "#6B7280" }}
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

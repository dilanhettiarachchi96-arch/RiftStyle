"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal() {
  const { product, isOpen, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? "");
      setSelectedColor(product.colors[0] ?? "");
    }
  }, [product]);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, 1);
    closeQuickView();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeQuickView()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            {product.badge && (
              <span
                className="absolute top-3 left-3 px-2.5 py-1 text-white text-xs font-semibold rounded-sm"
                style={{
                  backgroundColor:
                    product.badge === "Sale"
                      ? "#dc2626"
                      : product.badge === "New"
                      ? "#059669"
                      : "#7c3aed",
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C8A96E" }}>
              {product.category}
            </p>
            <h2
              className="text-xl font-bold mb-3 pr-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm line-through" style={{ color: "#9ca3af" }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
                  >
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "#6B7280" }}>
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-3 py-1.5 text-xs border transition-colors"
                    style={
                      selectedSize === size
                        ? { backgroundColor: "#1A1A1A", color: "white", borderColor: "#1A1A1A" }
                        : { borderColor: "#e5e7eb", color: "#1A1A1A" }
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2">
                Color: <span className="font-normal">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                    className="w-7 h-7 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor: color.toLowerCase().replace(/\s+/g, ""),
                      borderColor: selectedColor === color ? "#C8A96E" : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 text-sm font-semibold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                Add to Cart
              </button>
              <Link
                href={`/product/${product.id}`}
                onClick={closeQuickView}
                className="w-full text-center py-3 text-sm font-medium border transition-colors hover:bg-gray-50"
                style={{ borderColor: "#e5e7eb" }}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

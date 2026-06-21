"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useQuickView } from "@/context/QuickViewContext";

interface ProductCardProps {
  product: Product;
}

const badgeColors: Record<string, string> = {
  New: "bg-emerald-600",
  Sale: "bg-red-600",
  Trending: "bg-purple-600",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const { openQuickView } = useQuickView();

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge top-left */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-sm ${
              badgeColors[product.badge]
            }`}
          >
            {product.badge}
            {product.badge === "Sale" && discount > 0 && ` -${discount}%`}
          </span>
        )}

        {/* Wishlist button top-right */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm transition-all duration-200 hover:scale-110"
          aria-label="Add to Wishlist"
        >
          <Heart
            className="w-4 h-4"
            fill={wishlisted ? "#ef4444" : "none"}
            stroke={wishlisted ? "#ef4444" : "#1A1A1A"}
          />
        </button>

        {/* Quick View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => openQuickView(product)}
            className="px-5 py-2.5 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 shadow-lg"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-1">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "#6B7280" }}
        >
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium leading-snug hover:opacity-70 transition-opacity line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              className="text-xs line-through"
              style={{ color: "#9ca3af" }}
            >
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Size indicators */}
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {product.sizes.slice(0, 5).map((size) => (
            <span
              key={size}
              className="text-xs px-1.5 py-0.5 border rounded-sm"
              style={{ borderColor: "#e5e7eb", color: "#6B7280" }}
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

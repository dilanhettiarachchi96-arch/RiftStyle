"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Heart, Minus, Plus, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import StickyAddToCart from "@/components/shop/StickyAddToCart";
import { useCart } from "@/context/CartContext";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

const sizeChartData = [
  { size: "XS", chest: "81", waist: "63", hips: "88" },
  { size: "S", chest: "86", waist: "68", hips: "93" },
  { size: "M", chest: "91", waist: "73", hips: "98" },
  { size: "L", chest: "97", waist: "79", hips: "104" },
  { size: "XL", chest: "104", waist: "86", hips: "111" },
  { size: "XXL", chest: "111", waist: "94", hips: "118" },
];

function buildGallery(product: Product): string[] {
  return [
    product.image,
    `https://picsum.photos/seed/product-${product.id}-2/600/800`,
    `https://picsum.photos/seed/product-${product.id}-3/600/800`,
    `https://picsum.photos/seed/product-${product.id}-4/600/800`,
  ];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const buyButtonRef = useRef<HTMLDivElement>(null);

  const gallery = buildGallery(product);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Link
          href={`/category/${product.category}`}
          className="inline-flex items-center gap-1 text-sm mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "#6B7280" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-2 w-[72px] flex-shrink-0">
              {gallery.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`relative w-[72px] h-[90px] overflow-hidden rounded-sm border-2 transition-all ${
                    mainImage === idx
                      ? "border-gray-900"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={gallery[mainImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
              {product.badge && (
                <span
                  className="absolute top-4 left-4 px-3 py-1 text-white text-xs font-semibold rounded-sm z-10"
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
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "#C8A96E" }}
            >
              {product.category}
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg line-through" style={{ color: "#9ca3af" }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span
                    className="text-sm font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
                  >
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description bullets */}
            <ul className="list-disc pl-5 space-y-1 mb-6">
              {product.description.split(".").filter(Boolean).map((sentence, i) => (
                <li key={i} className="text-sm" style={{ color: "#6B7280" }}>
                  {sentence.trim()}
                </li>
              ))}
            </ul>

            {/* Color Selector */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3">
                Color:{" "}
                <span className="font-normal capitalize">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                    className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                    style={{
                      backgroundColor: color.toLowerCase().replace(/\s+/g, "").replace(/[/&]/g, ""),
                      borderColor:
                        selectedColor === color ? "#C8A96E" : "#e5e7eb",
                      boxShadow:
                        selectedColor === color ? "0 0 0 2px white, 0 0 0 4px #C8A96E" : "none",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest">Select Size</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="flex items-center gap-1 text-xs hover:opacity-70 transition-opacity"
                      style={{ color: "#6B7280" }}
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      Size Chart
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Size Chart</DialogTitle>
                    </DialogHeader>
                    <div className="text-xs" style={{ color: "#6B7280" }}>
                      <p className="mb-3">All measurements in centimetres (CM)</p>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr style={{ backgroundColor: "#f9fafb" }}>
                            <th className="border px-3 py-2 text-left text-xs font-semibold" style={{ borderColor: "#e5e7eb" }}>Size</th>
                            <th className="border px-3 py-2 text-xs font-semibold" style={{ borderColor: "#e5e7eb" }}>Chest (CM)</th>
                            <th className="border px-3 py-2 text-xs font-semibold" style={{ borderColor: "#e5e7eb" }}>Waist (CM)</th>
                            <th className="border px-3 py-2 text-xs font-semibold" style={{ borderColor: "#e5e7eb" }}>Hips (CM)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChartData.map((row) => (
                            <tr key={row.size} className="hover:bg-gray-50">
                              <td className="border px-3 py-2 font-semibold" style={{ borderColor: "#e5e7eb" }}>{row.size}</td>
                              <td className="border px-3 py-2 text-center" style={{ borderColor: "#e5e7eb" }}>{row.chest}</td>
                              <td className="border px-3 py-2 text-center" style={{ borderColor: "#e5e7eb" }}>{row.waist}</td>
                              <td className="border px-3 py-2 text-center" style={{ borderColor: "#e5e7eb" }}>{row.hips}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-3 text-xs" style={{ color: "#9ca3af" }}>
                        Tip: Measure yourself and select the closest size. For best fit, measure chest/bust at the fullest point.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 border text-sm font-medium transition-all"
                    style={
                      selectedSize === size
                        ? {
                            backgroundColor: "#1A1A1A",
                            color: "white",
                            borderColor: "#1A1A1A",
                          }
                        : {
                            borderColor: "#e5e7eb",
                            color: "#1A1A1A",
                          }
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3">Quantity</p>
              <div
                className="inline-flex items-center border"
                style={{ borderColor: "#e5e7eb" }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 text-sm font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buy buttons */}
            <div ref={buyButtonRef} className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 text-sm font-semibold tracking-widest uppercase border-2 transition-colors hover:bg-black hover:text-white"
                style={{ borderColor: "#C8A96E", color: "#C8A96E" }}
              >
                Buy Now
              </button>
              <button
                className="sm:w-14 flex items-center justify-center py-3.5 border transition-colors hover:bg-gray-50"
                style={{ borderColor: "#e5e7eb" }}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery info */}
            <div
              className="rounded-sm p-4 mb-6"
              style={{ backgroundColor: "#f9f9f7", border: "1px solid #e5e7eb" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2">
                Estimated Delivery
              </p>
              <ul className="space-y-1">
                <li className="text-sm" style={{ color: "#6B7280" }}>
                  🚚 All island delivery — Rs. 425
                </li>
                <li className="text-sm" style={{ color: "#6B7280" }}>
                  📦 Ships within 2–4 business days
                </li>
                <li className="text-sm" style={{ color: "#6B7280" }}>
                  🔄 Easy returns within 7 days
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div className="pt-4 border-t" style={{ borderColor: "#e5e7eb" }}>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Tags:{" "}
                {product.tags.map((tag) => (
                  <span key={tag} className="mr-2 capitalize">
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        {related.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#C8A96E" }}>
                From the Same Collection
              </p>
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                You Might Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <StickyAddToCart
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        mainBuyRef={buyButtonRef}
      />
    </main>
  );
}

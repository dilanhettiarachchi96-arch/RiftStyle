"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/shop/ProductCard";
import { Category } from "@/types";

type Filter = "all" | Category;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Kids", value: "kids" },
];

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function BestSellers() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeFilter).slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: "#C8A96E" }}
          >
            Customer Favourites
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Best Sellers
          </h2>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm ${
                  activeFilter === f.value
                    ? "text-white"
                    : "bg-transparent hover:opacity-70"
                }`}
                style={
                  activeFilter === f.value
                    ? { backgroundColor: "#1A1A1A" }
                    : { color: "#6B7280" }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <motion.div
          ref={ref}
          key={activeFilter}
          variants={containerVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariant}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

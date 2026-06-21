"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const subcategories = [
  {
    label: "Casual Wear",
    emoji: "👕",
    href: "/category/women?sub=casual",
    color: "#fdf6ec",
    accent: "#C8A96E",
  },
  {
    label: "Formal / Office",
    emoji: "👔",
    href: "/category/men?sub=formal",
    color: "#f0f4ff",
    accent: "#4f6ef7",
  },
  {
    label: "Kurtis & Sarees",
    emoji: "🥻",
    href: "/category/women?sub=kurtis",
    color: "#fdf0f4",
    accent: "#e76f9a",
  },
  {
    label: "Sportswear",
    emoji: "🏃",
    href: "/shop?tags=sport",
    color: "#f0fdf4",
    accent: "#22c55e",
  },
  {
    label: "Party & Festival",
    emoji: "🎉",
    href: "/shop?tags=party",
    color: "#faf5ff",
    accent: "#a855f7",
  },
  {
    label: "Kids Fashion",
    emoji: "🧸",
    href: "/category/kids",
    color: "#fff7ed",
    accent: "#f97316",
  },
];

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ShopByCategory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#C8A96E" }}>
            Browse by style
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Category
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {subcategories.map((cat) => (
            <motion.div key={cat.label} variants={itemVariant}>
              <Link
                href={cat.href}
                className="group flex flex-col items-center gap-3 p-5 rounded-sm text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                style={{ backgroundColor: cat.color }}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span
                  className="text-xs font-semibold tracking-wide leading-tight"
                  style={{ color: "#1A1A1A" }}
                >
                  {cat.label}
                </span>
                <span
                  className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -mt-1"
                  style={{ color: cat.accent }}
                >
                  Shop →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

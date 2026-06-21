"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getNewArrivals } from "@/lib/mock-data";
import ProductCard from "@/components/shop/ProductCard";
import { ArrowRight } from "lucide-react";

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function NewArrivals() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const products = getNewArrivals(8);

  return (
    <section className="py-16" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: "#C8A96E" }}
            >
              Fresh Drops
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Just In — New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?badge=New"
            className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product grid */}
        <motion.div
          ref={ref}
          variants={containerVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariant}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/shop?badge=New"
            className="inline-flex items-center gap-2 text-sm font-medium border-b pb-0.5"
            style={{ borderColor: "#C8A96E", color: "#C8A96E" }}
          >
            View All New Arrivals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

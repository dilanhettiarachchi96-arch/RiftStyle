"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
}

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductGrid({ products, cols = 4 }: ProductGridProps) {
  const colClass =
    cols === 4
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : cols === 3
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className={`grid ${colClass} gap-x-4 gap-y-8`}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariant}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

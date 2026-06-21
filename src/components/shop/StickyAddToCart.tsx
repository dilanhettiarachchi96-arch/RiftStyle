"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface StickyAddToCartProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  mainBuyRef: React.RefObject<HTMLDivElement | null>;
}

export default function StickyAddToCart({
  product,
  selectedSize,
  selectedColor,
  mainBuyRef,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (mainBuyRef.current) observer.observe(mainBuyRef.current);
    return () => observer.disconnect();
  }, [mainBuyRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg"
          style={{ borderColor: "#e5e7eb" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.name}</p>
              <p className="text-sm font-semibold" style={{ color: "#C8A96E" }}>
                Rs. {product.price.toLocaleString()}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-500">Size:</span>
              <div className="flex gap-1">
                {product.sizes.slice(0, 5).map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 text-xs border"
                    style={
                      selectedSize === size
                        ? { backgroundColor: "#1A1A1A", color: "white", borderColor: "#1A1A1A" }
                        : { borderColor: "#e5e7eb", color: "#6B7280" }
                    }
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => addItem(product, selectedSize, selectedColor, 1)}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold tracking-widest uppercase text-white flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

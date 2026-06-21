"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/lib/mock-data";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    if (query.trim().length === 0) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ backgroundColor: "#FAFAF8" }}
        >
          <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-8 pb-4 flex-1 flex flex-col overflow-y-auto">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 flex-shrink-0" style={{ color: "#6B7280" }} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, categories..."
                className="flex-1 bg-transparent text-xl sm:text-2xl outline-none placeholder:text-gray-400"
                style={{ fontFamily: "'Playfair Display', serif" }}
              />
              <button onClick={onClose} aria-label="Close search" className="p-2 hover:opacity-60">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8">
              {query.trim().length === 0 && (
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  Try searching &ldquo;saree&rdquo;, &ldquo;shirt&rdquo;, or &ldquo;kids&rdquo;
                </p>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  No products found for &ldquo;{query}&rdquo;
                </p>
              )}

              {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="200px"
                        />
                      </div>
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-sm" style={{ color: "#6B7280" }}>
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

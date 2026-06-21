"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { categories } from "@/lib/mock-data";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function CategoryGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        ref={ref}
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={fadeUpVariant}>
            <Link
              href={`/category/${cat.id}`}
              className="group relative block overflow-hidden rounded-sm aspect-[3/4]"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cat.label}
                </h3>
                <p className="text-sm opacity-80">{cat.description}</p>
                <span
                  className="inline-block mt-3 text-xs font-semibold tracking-widest uppercase border-b pb-0.5 transition-all duration-300 group-hover:border-amber-400"
                  style={{ borderColor: "#C8A96E", color: "#C8A96E" }}
                >
                  Shop Now →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

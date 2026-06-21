"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FeaturedCollection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "500px" }}>
      <Image
        src="https://picsum.photos/seed/banner-featured/1400/600"
        alt="The Andriana Collection"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center text-white px-6 max-w-2xl">
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.4em] mb-3"
            style={{ color: "#C8A96E" }}
          >
            Exclusive Drop
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            THE ANDRIANA COLLECTION
          </h2>
          <p className="text-sm sm:text-base mb-8 opacity-90 tracking-wide">
            Effortless Elegance, Every Day
          </p>
          <Link
            href="/shop"
            className="inline-block px-10 py-3.5 text-sm font-semibold tracking-widest uppercase border-2 transition-all duration-300 hover:bg-white hover:text-black"
            style={{ borderColor: "#C8A96E", color: "#C8A96E" }}
          >
            Explore Collection
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "https://picsum.photos/seed/banner-1/1400/600",
    headline: "NEW ARRIVALS YOU NEED",
    tagline: "The Women's Collection",
    cta: "Shop Women",
    ctaHref: "/category/women",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/banner-2/1400/600",
    headline: "STYLE MEETS COMFORT",
    tagline: "The Men's Collection",
    cta: "Shop Men",
    ctaHref: "/category/men",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/banner-3/1400/600",
    headline: "DRESS THEM IN JOY",
    tagline: "The Kids' Collection",
    cta: "Shop Kids",
    ctaHref: "/category/kids",
  },
];

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "min(90vh, 700px)" }}>
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-none w-full h-full"
              style={{ minWidth: "100%" }}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                className="object-cover"
                priority={slide.id === 1}
                sizes="100vw"
              />
              {/* Dark scrim */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-6 max-w-3xl">
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-4"
                    style={{ color: "#C8A96E" }}
                  >
                    {slide.tagline}
                  </p>
                  <h1
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {slide.headline}
                  </h1>
                  <p
                    className="text-sm sm:text-base mb-8 tracking-widest uppercase"
                    style={{ color: "#C8A96E" }}
                  >
                    Dress the Way You Feel
                  </p>
                  <Link
                    href={slide.ctaHref}
                    className="inline-block px-8 py-3 text-sm font-semibold tracking-widest uppercase border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === selectedIndex
                ? "w-8 opacity-100"
                : "opacity-50 hover:opacity-75"
            }`}
            style={{
              backgroundColor: idx === selectedIndex ? "#C8A96E" : "white",
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

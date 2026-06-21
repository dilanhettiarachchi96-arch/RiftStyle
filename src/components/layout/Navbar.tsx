"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "@/components/layout/SearchOverlay";

type SubLink = { label: string; href: string };

const dropdowns: Record<string, SubLink[]> = {
  women: [
    { label: "Casual Wear", href: "/category/women?sub=casual" },
    { label: "Formal / Office Wear", href: "/category/women?sub=formal" },
    { label: "Kurtis & Sarees", href: "/category/women?sub=kurtis" },
    { label: "Nightwear", href: "/category/women?sub=nightwear" },
    { label: "Sportswear", href: "/category/women?sub=sportswear" },
  ],
  men: [
    { label: "Casual Wear", href: "/category/men?sub=casual" },
    { label: "Formal / Office Wear", href: "/category/men?sub=formal" },
    { label: "Innerwear", href: "/category/men?sub=innerwear" },
    { label: "Sportswear", href: "/category/men?sub=sportswear" },
  ],
  kids: [
    { label: "Girls", href: "/category/kids?sub=girls" },
    { label: "Boys", href: "/category/kids?sub=boys" },
    { label: "Baby", href: "/category/kids?sub=baby" },
  ],
};

const navLinks = [
  { href: "/", label: "Home", key: "" },
  { href: "/category/women", label: "Women", key: "women" },
  { href: "/category/men", label: "Men", key: "men" },
  { href: "/category/kids", label: "Kids", key: "kids" },
  { href: "/shop?sale=true", label: "Sale", key: "" },
  { href: "/shop?badge=New", label: "New Arrivals", key: "" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
            >
              RiftStyle
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const subLinks = link.key ? dropdowns[link.key] : undefined;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => subLinks && setActiveDropdown(link.key)}
                  onMouseLeave={() => subLinks && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium tracking-wide hover:text-amber-600 transition-colors py-2"
                    style={{ color: "#1A1A1A" }}
                  >
                    {link.label === "Sale" ? (
                      <span style={{ color: "#dc2626" }}>{link.label}</span>
                    ) : (
                      link.label
                    )}
                    {subLinks && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {subLinks && (
                    <AnimatePresence>
                      {activeDropdown === link.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2 min-w-[220px]"
                        >
                          <div className="bg-white shadow-lg border rounded-sm py-2" style={{ borderColor: "#f3f4f6" }}>
                            {subLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                style={{ color: "#1A1A1A" }}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              className="hidden sm:flex p-2 hover:opacity-70 transition-opacity"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:opacity-70 transition-opacity relative"
              aria-label="Cart"
              onClick={openCart}
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white"
                style={{ backgroundColor: "#C8A96E", fontSize: "10px" }}
              >
                {count}
              </span>
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <button
                className="md:hidden p-2"
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <SheetContent side="right" className="w-72 bg-white overflow-y-auto">
                <div className="flex flex-col gap-6 mt-8">
                  <Link
                    href="/"
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    RiftStyle
                  </Link>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const subLinks = link.key ? dropdowns[link.key] : undefined;
                      return (
                        <div key={link.label} className="border-b border-gray-100 py-1">
                          <Link
                            href={link.href}
                            className="block text-base font-medium py-2 hover:text-amber-600 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                          {subLinks && (
                            <div className="flex flex-col pl-3 pb-2 gap-1">
                              {subLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="text-sm py-1"
                                  style={{ color: "#6B7280" }}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

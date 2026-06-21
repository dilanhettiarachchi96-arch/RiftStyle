"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface QuickViewContextValue {
  product: Product | null;
  isOpen: boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextValue | undefined>(undefined);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (p: Product) => {
    setProduct(p);
    setIsOpen(true);
  };

  const closeQuickView = () => setIsOpen(false);

  return (
    <QuickViewContext.Provider value={{ product, isOpen, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within a QuickViewProvider");
  return ctx;
}

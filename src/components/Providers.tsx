"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import CartSidebar from "@/components/layout/CartSidebar";
import QuickViewModal from "@/components/shop/QuickViewModal";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <QuickViewProvider>
        {children}
        <CartSidebar />
        <QuickViewModal />
      </QuickViewProvider>
    </CartProvider>
  );
}

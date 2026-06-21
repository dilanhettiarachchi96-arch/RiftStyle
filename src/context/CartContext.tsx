"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Product } from "@/types";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineKey(productId: string, size: string, color: string) {
  return `${productId}__${size}__${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    setItems((prev) => {
      const key = lineKey(product.id, size, color);
      const existing = prev.find(
        (item) => lineKey(item.product.id, item.size, item.color) === key
      );
      if (existing) {
        return prev.map((item) =>
          lineKey(item.product.id, item.size, item.color) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, size: string, color: string) => {
    const key = lineKey(productId, size, color);
    setItems((prev) =>
      prev.filter((item) => lineKey(item.product.id, item.size, item.color) !== key)
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    const key = lineKey(productId, size, color);
    setItems((prev) =>
      prev
        .map((item) =>
          lineKey(item.product.id, item.size, item.color) === key
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
    );
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        subtotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

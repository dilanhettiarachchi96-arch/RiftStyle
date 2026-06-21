"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "#e5e7eb" }}>
          <SheetTitle style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart {items.length > 0 && `(${items.length})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-3">
            <ShoppingBag className="w-10 h-10" style={{ color: "#9ca3af" }} />
            <p style={{ color: "#6B7280" }}>Your cart is empty</p>
            <button
              onClick={closeCart}
              className="mt-2 px-6 py-2.5 text-sm font-semibold tracking-widest uppercase text-white"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-3 pb-5 border-b"
                  style={{ borderColor: "#f3f4f6" }}
                >
                  <Link
                    href={`/product/${item.product.id}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col min-w-0">
                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={closeCart}
                      className="text-sm font-medium leading-snug hover:opacity-70 transition-opacity line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                      Size: {item.size} · Color: {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div
                        className="flex items-center border rounded-sm"
                        style={{ borderColor: "#e5e7eb" }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                    className="p-1 self-start hover:opacity-60 transition-opacity"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" style={{ color: "#9ca3af" }} />
                  </button>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t space-y-4" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: "#6B7280" }}>Subtotal</span>
                <span className="text-base font-semibold">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full text-center py-3.5 text-sm font-semibold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

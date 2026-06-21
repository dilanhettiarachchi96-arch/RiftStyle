"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PromoStrip from "@/components/home/PromoStrip";
import { useCart } from "@/context/CartContext";

const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", description: "Pay when you receive your order", disabled: false },
  { id: "bank", label: "Bank Deposit", description: "Transfer to our bank account", disabled: false },
  { id: "card", label: "Credit / Debit Card", description: "Coming soon", disabled: true },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, count } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const shipping = 425;
  const total = subtotal + shipping;

  const update = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    router.push("/checkout/success");
  };

  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <PromoStrip />
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link href="/shop" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#6B7280" }}>
            ← Continue Shopping
          </Link>
          <h1
            className="text-3xl font-bold mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Form */}
          <div className="flex-1 space-y-8">
            {/* Contact */}
            <section>
              <h2 className="text-base font-semibold mb-4 uppercase tracking-widest text-xs" style={{ color: "#1A1A1A" }}>
                Contact Information
              </h2>
              <Field
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="you@example.com"
              />
            </section>

            {/* Delivery */}
            <section>
              <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "#1A1A1A" }}>
                Delivery Address
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field
                  label="First Name"
                  value={form.firstName}
                  onChange={(v) => update("firstName", v)}
                  error={errors.firstName}
                  placeholder="Asha"
                />
                <Field
                  label="Last Name"
                  value={form.lastName}
                  onChange={(v) => update("lastName", v)}
                  error={errors.lastName}
                  placeholder="Fernando"
                />
              </div>
              <div className="mb-4">
                <Field
                  label="Address"
                  value={form.address}
                  onChange={(v) => update("address", v)}
                  error={errors.address}
                  placeholder="123 Galle Road, Colombo 03"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="City"
                  value={form.city}
                  onChange={(v) => update("city", v)}
                  error={errors.city}
                  placeholder="Colombo"
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  error={errors.phone}
                  placeholder="077 123 4567"
                />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "#1A1A1A" }}>
                Shipping Method
              </h2>
              <div
                className="flex items-center justify-between p-4 border rounded-sm"
                style={{ borderColor: "#C8A96E", backgroundColor: "#fdf9f3" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-4 flex-shrink-0"
                    style={{ borderColor: "#C8A96E" }}
                  />
                  <div>
                    <p className="text-sm font-medium">All island delivery</p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>2–4 business days</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">Rs. {shipping}</span>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: "#1A1A1A" }}>
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    disabled={pm.disabled}
                    onClick={() => !pm.disabled && setSelectedPayment(pm.id)}
                    className={`w-full flex items-start gap-3 p-4 border rounded-sm text-left transition-all ${
                      pm.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{
                      borderColor: selectedPayment === pm.id ? "#C8A96E" : "#e5e7eb",
                      backgroundColor: selectedPayment === pm.id ? "#fdf9f3" : "white",
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0"
                      style={{
                        borderColor: selectedPayment === pm.id ? "#C8A96E" : "#e5e7eb",
                        backgroundColor: selectedPayment === pm.id ? "#C8A96E" : "transparent",
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium">{pm.label}</p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>
                        {pm.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 text-sm font-semibold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              Place Order
            </button>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div
              className="sticky top-24 rounded-sm overflow-hidden"
              style={{ border: "1px solid #e5e7eb", backgroundColor: "white" }}
            >
              <div className="px-5 py-4 border-b" style={{ borderColor: "#e5e7eb" }}>
                <h2 className="text-sm font-semibold uppercase tracking-widest">
                  Order Summary ({count} {count === 1 ? "item" : "items"})
                </h2>
              </div>

              <div className="px-5 py-4 space-y-4 max-h-80 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-sm text-center py-4" style={{ color: "#9ca3af" }}>
                    Your cart is empty
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2 leading-snug">
                          {item.product.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                          {item.size} · {item.color}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div
                className="px-5 py-4 border-t space-y-3"
                style={{ borderColor: "#e5e7eb", backgroundColor: "#fafaf8" }}
              >
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B7280" }}>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B7280" }}>Shipping</span>
                  <span>Rs. {shipping.toLocaleString()}</span>
                </div>
                <div
                  className="flex justify-between font-semibold text-base pt-3 border-t"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: "#6B7280" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm border rounded-sm outline-none focus:ring-2 transition-all ${
          error ? "border-red-400" : "border-gray-200 focus:border-gray-400"
        }`}
        style={{ backgroundColor: "white" }}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoStrip from "@/components/home/PromoStrip";
import { getProductById, products } from "@/lib/mock-data";
import ProductDetailClient from "@/components/shop/ProductDetailClient";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <PromoStrip />
      <Navbar />
      <ProductDetailClient product={product} related={related} />
      <Footer />
    </>
  );
}

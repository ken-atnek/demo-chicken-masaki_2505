/* =======================================
 * 商品詳細
 * URL: src/app/products/[id]/page.tsx
 * Created: 2025-05-28
 * Last updated: 2025-05-28
 * ======================================= */

import { productList } from '@/data/productList';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/app/products/[id]/ProductDetailClient';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage(props: PageProps) {
  const { id } = await props.params;
  const product = productList.find((item) => item.id === id);

  if (!product) return notFound();

  const index = productList.findIndex((item) => item.id === id);
  const prevProduct = index > 0 ? productList[index - 1] : null;
  const nextProduct =
    index < productList.length - 1 ? productList[index + 1] : null;

  return (
    <ProductDetailClient
      product={product}
      prevProductId={prevProduct?.id}
      nextProductId={nextProduct?.id}
    />
  );
}

export async function generateStaticParams() {
  return productList.map((product) => ({
    id: product.id,
  }));
}

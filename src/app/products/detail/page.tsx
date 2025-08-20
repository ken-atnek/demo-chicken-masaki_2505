/* =======================================
 * 商品詳細
 * URL: src/app/products/detail/page.tsx
 * Created: 2025-05-28
 * Last updated: 2025-05-28
 * ======================================= */

import { Suspense } from 'react';
import ProductDetailClient from '@/app/products/detail/ProductDetailClient';

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ProductDetailClient />
    </Suspense>
  );
}


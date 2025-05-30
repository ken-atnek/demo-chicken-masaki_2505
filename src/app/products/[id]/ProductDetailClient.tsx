'use client';
/* =======================================
 * 商品詳細
 * URL: src/app/products/[id]/ProductDetailClient.tsx
 * Created: 2025-05-29
 * Last updated: 2025-05-29
 * ======================================= */
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/productItem.module.scss';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  catchCopy: string;
  price: number;
  unitNote?: string;
  description?: string;
  images: (string | StaticImageData)[];
};

type Props = {
  product: Product;
  prevProductId?: string;
  nextProductId?: string;
};

export default function ProductDetailClient({
  product,
  prevProductId,
  nextProductId,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className={styles.productItem}>
      <div className={styles.mainImage}>
        <Image src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.imageGroup}>
        {product.images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`${product.title} 画像${idx + 1}`}
            style={{ objectFit: 'cover' }}
          />
        ))}
      </div>
      <article>
        <p className={styles.catchCopy}>{product.catchCopy}</p>
        <h1>{product.title}</h1>
        <p className={styles.price}>
          {product.price.toLocaleString()}
          {product.unitNote && <span> {product.unitNote}</span>}
        </p>
        {product.description && (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}
        <div className={styles.blockCart}>
          <div className={styles.quantity}>
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>＋</button>
          </div>
          <p className={styles.subtotal}>
            小計：{(product.price * quantity).toLocaleString()}円
          </p>
          <button className={styles.addToCart}>カートに入れる</button>
        </div>
        <nav>
          <div>
            {prevProductId ? (
              <a href={`/products/${prevProductId}`}>← 前の商品へ</a>
            ) : (
              <span />
            )}
          </div>
          <div>
            <Link href="/products" className={styles.linkList}>
              商品一覧へ
            </Link>
          </div>
          <div>
            {nextProductId ? (
              <a href={`/products/${nextProductId}`}>次の商品へ →</a>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>
    </section>
  );
}

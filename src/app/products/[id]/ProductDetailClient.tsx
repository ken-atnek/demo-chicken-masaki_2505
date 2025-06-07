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
  productClassId: string; // ← 追加
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

  // 商品をカートに追加する関数 (フォームを作成してPOSTリクエストを送信する)
  const handleAddToCart = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://demo-shop-chicken-masaki.tuna-pic.co.jp/cart';

    const inputProductClassId = document.createElement('input');
    inputProductClassId.type = 'hidden';
    inputProductClassId.name = 'product_class_id';
    inputProductClassId.value = product.productClassId;

    const inputQuantity = document.createElement('input');
    inputQuantity.type = 'hidden';
    inputQuantity.name = 'quantity';
    inputQuantity.value = quantity.toString();

    form.appendChild(inputProductClassId);
    form.appendChild(inputQuantity);

    document.body.appendChild(form);
    form.submit();
  };


  return (
    <section className={styles.productItem}>
      <div className={styles.mainImage}>
        <Image src={product.images[0]} alt={product.title} width={600} height={400} unoptimized />
      </div>
      <div className={styles.imageGroup}>
        {product.images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`${product.title} 画像${idx + 1}`}
            width={600} height={400} unoptimized
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
            dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br>') }}
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
          <button className={styles.addToCart} onClick={handleAddToCart}>カートに入れる</button>
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

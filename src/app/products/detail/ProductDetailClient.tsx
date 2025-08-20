'use client';
/* =======================================
 * 商品詳細
 * URL: src/app/products/[id]/ProductDetailClient.tsx
 * Created: 2025-05-29
 * Last updated: 2025-05-29
 * ======================================= */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/productItem.module.scss';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  catchCopy: string | null;
  description?: string | null;
  price: number;
  unitNote?: string | null;
  productClassId: number;
  images: (string | StaticImageData)[];
  mainImage: string | null;
};

type ApiCart = {
  action?: string;           // 例: https://.../online-shop/products/add_cart/1
  token?: string;            // CSRF トークン
  product_id?: number;       // 例: 1
  product_class_id?: number; // 例: 1
};

type ApiResponse = {
  id: number;
  title: string;
  catchCopy: string | null;
  description?: string | null;
  price: number;
  unitNote?: string | null;
  productClassId: number;
  images: string[];
  mainImage: string | null;
  nextProductId?: number | null;
  prevProductId?: number | null;
  cart?: ApiCart;
};

type AddCartResponse = {
  ok: boolean;
  cart?: {
    count: number;
  };
  item?: {
    product_id: number;
    product_class_id: number;
    quantity: number;
  };
  error?: string;
  message?: string;
};


export default function ProductDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');


  const [product, setProduct] = useState<Product | null>(null);
  // const [cart, setCart] = useState<ApiCart | null>(null);
  const [nextProductId, setNextId] = useState<number | null>(null);
  const [prevProductId, setPrevId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://demo-chicken-masaki.tuna-pic.co.jp/online-shop/custom-api/product_detail/${id}`,
          {
            method: 'GET',
            credentials: 'same-origin', // ← PHPSESSID を受け取るため必須
            cache: 'no-store',
          }
        );
        if (!res.ok) throw new Error('商品が見つかりません');
        const data: ApiResponse = await res.json();

        // APIのキーに合わせて整形
        const p: Product = {
          id: Number(data.id),
          title: data.title,
          catchCopy: data.catchCopy ?? null,
          description: data.description ?? null,
          price: Number(data.price ?? 0),
          unitNote: data.unitNote ?? null,
          productClassId: Number(data.productClassId),
          images: Array.isArray(data.images) ? data.images : [],
          mainImage: data.mainImage ?? null,
        };

        setProduct(p);
        // setCart(data.cart ?? null);
        setNextId(data.nextProductId ?? null);
        setPrevId(data.prevProductId ?? null);
      } catch (e) {
        console.error(e);
        setProduct(null);
        setNextId(null);
        setPrevId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>読み込み中です...</p>;
  if (!product) return <p>商品が見つかりませんでした。</p>;


const handleAddToCart = async () => {
  if (!product || !product.productClassId) {
    alert('商品情報が不足しています。ページを再読み込みしてください。');
    return;
  }

  try {
    const res = await fetch('/online-shop/custom-api/cart/add', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: Number(product.id),
        product_class_id: Number(product.productClassId),
        quantity: Number(quantity),
      }),
      cache: 'no-store',
      // redirect: 'manual',
    });

    const text = await res.text();
    let data:  AddCartResponse | null = null;
    try { data = JSON.parse(text); } catch {}

    if (!res.ok || !data?.ok) {
      alert((data && data.message) ? data.message : `カート追加に失敗しました (${res.status})`);
      return;
    }

    alert('カートに追加しました');
    // 必要ならここで data.cart.count などを使ってヘッダーのカート数を更新
  } catch (err) {
    console.error(err);
    alert('通信に失敗しました。ネットワークをご確認ください。');
  }
};

/*
  // 商品をカートに追加する関数 (フォームを作成してPOSTリクエストを送信する)
  const handleAddToCart = () => {

    if (!product) return;

    // CSRFトークン必須（開発でAddCartTypeのcsrf無効化時は不要だが本番は必須）
    if (!cart?.token) {
      alert('カート用トークンが取得できていません。ページを再読み込みしてください。');
      return;
    }

    const action = cart.action || `https://demo-chicken-masaki.tuna-pic.co.jp/online-shop/products/add_cart/${product.id}`;

    // ★ 追加: 一時的にURLをEC-CUBE側の商品詳細に差し替える（同一オリジン前提）
    const originalUrl = window.location.href;
    const ecProductUrl = `/online-shop/products/detail/${product.id}`;
    window.history.replaceState(null, '', ecProductUrl);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;

    // product_id
    const inPid = document.createElement('input');
    inPid.type = 'hidden';
    inPid.name = 'product_id';
    inPid.value = String(product.id);

    // product_class_id
    const inputProductClassId = document.createElement('input');
    inputProductClassId.type = 'hidden';
    inputProductClassId.name = 'ProductClass';
    inputProductClassId.value = String(product.productClassId);

    // quantity
    const inputQuantity = document.createElement('input');
    inputQuantity.type = 'hidden';
    inputQuantity.name = 'quantity';
    inputQuantity.value = String(quantity);

    // _token (CSRF)
    const inToken = document.createElement('input');
    inToken.type = 'hidden';
    inToken.name = '_token';
    inToken.value = cart.token;

    form.appendChild(inPid);
    form.appendChild(inputProductClassId);
    form.appendChild(inputQuantity);
    form.appendChild(inToken);

    document.body.appendChild(form);
    form.submit();

    // （任意）数秒後にURLを元に戻す処理を入れることもできますが、
    // 実際はEC-CUBE側のリダイレクトでもうページ遷移してしまうため通常不要です。
    setTimeout(() => window.history.replaceState(null, '', originalUrl), 3000);

  };
*/

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
              <a href={`/products/detail?id=${prevProductId}`}>← 前の商品へ</a>
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
              <a href={`/products/detail?id=${nextProductId}`}>次の商品へ →</a>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>
    </section>
  );
}

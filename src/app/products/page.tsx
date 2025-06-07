/* =======================================
 * 商品一覧ページ
 * URL: src/app/products/page.tsx
 * Created: 2025-05-28
 * Last updated: 2025-05-28
 * ======================================= */
// import Link from 'next/link';
import styles from '@/styles/products.module.scss';
import headImage from '@/assets/images/head_product.webp';
import Image from 'next/image';
// import { productList } from '@/data/productList';
import { getProductList } from '@/data/productList';
import Link from 'next/link';

export default async function ProductPage() {
  //動的に商品一覧を取得する
  const productList = await getProductList();
  return (
    <>
      <section className={styles.blockHead}>
        <Image src={headImage} alt="ローストチキン画像" />
        <h2>PRODUCT</h2>
      </section>
      <section className={styles.blockProduct}>
        <ul className={styles.productList}>
          {productList.map((item) => (
            <li key={item.id}>
              <Link
                href={`/products/${item.id}`}
                className={styles.linkItem}
              ></Link>
              <Image src={item.images[0]} alt={item.title} width={600} height={400} unoptimized />
              <p className={styles.catchCopy}>{item.catchCopy}</p>
              <div className={styles.boxDetail}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.price}>
                  {item.price.toLocaleString()}
                  {item.unitNote && <span> {item.unitNote}</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}


/*
export default function Product() {
  return (
    <>
      <section className={styles.blockHead}>
        <Image src={headImage} alt="ローストチキン画像" />
        <h2>PRODUCT</h2>
      </section>
      <section className={styles.blockProduct}>
        <ul className={styles.productList}>
          {productList.map((item) => (
            <li key={item.id}>
              <Link
                href={`/products/${item.id}`}
                className={styles.linkItem}
              ></Link>
              <Image src={item.images[0]} alt={item.title} />
              <p className={styles.catchCopy}>{item.catchCopy}</p>
              <div className={styles.boxDetail}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.price}>
                  {item.price.toLocaleString()}
                  {item.unitNote && <span> {item.unitNote}</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
*/
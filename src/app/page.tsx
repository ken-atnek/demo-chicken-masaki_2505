/* =======================================
 * TOPページ
 * URL: /app/page.tsx
 * Created: 2025-05-15
 * Last updated: 2025-05-15
 * ======================================= */
import Link from 'next/link';
import styles from '@/styles/top.module.scss';

export default function Home() {
  return (
    <>
      <section className={styles.blockTop}>
        <Link href="./products/">PRODUCT</Link>
      </section>
    </>
  );
}

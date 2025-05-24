/* =======================================
 * FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2025-04-25
 * Last updated: 2025-04-26
 * ======================================= */
import styles from '@/styles/components/common/Footer.module.scss';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <article>
        <nav>
          <Link href="/" className={`${styles.itemLink} ${styles.linkTop}`}>
            TOP
          </Link>
          <Link href="/#ContainerNews" className={styles.itemLink}>
            NEWS
          </Link>
          <Link href="/#ContainerAbout" className={styles.itemLink}>
            about us
          </Link>
          <Link href="/#ContainerFlow" className={styles.itemLink}>
            flow
          </Link>
          <Link href="/#ContainerFaq" className={styles.itemLink}>
            faq
          </Link>
          <Link href="/#ContainerContact" className={styles.itemLink}>
            entry
          </Link>
        </nav>
        <div className={styles.copyright}>
          Copyright KUMANICHI GROUP. All Rights Reserved.
        </div>
      </article>
    </footer>
  );
};

export default Footer;

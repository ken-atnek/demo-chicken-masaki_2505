/* =======================================
 * FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2025-05-24
 * Last updated: 2025-05-24
 * ======================================= */
import styles from '@/styles/components/common/Footer.module.scss';
const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <article>
        <div className={styles.boxLogo}>
          <h4>
            <span>Chicken&nbsp;shop</span>MASAKI
          </h4>
        </div>
      </article>
    </footer>
  );
};

export default Footer;

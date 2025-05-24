/* =======================================
 * TOPページ
 * URL: /app/page.tsx
 * Created: 2025-05-15
 * Last updated: 2025-05-15
 * ======================================= */
import Link from 'next/link';
import styles from '@/styles/top.module.scss';
import ContainerSlide from '@/components/ContainerSlide';
import BlockBlogList from '@/components/BlockBlogList';
import OrganizationalChart from '@/assets/images/organizational-chart.webp';
import Image from 'next/image';
import ContainerGroup from '@/components/ContainerGroup';
import ContainerFlow from '@/components/ContainerFlow';
import ContainerFaq from '@/components/ContainerFaq';

export default function Home() {
  return (
    <>
      <ContainerSlide />
      <section className={styles.containerNews} id="ContainerNews">
        <article>
          <h2>news</h2>
          <BlockBlogList limit={3} />
          <Link href="/blog/" className={styles.linkBlog}>
            すべてを見る
          </Link>
        </article>
      </section>
      <section className={styles.containerAbout} id="ContainerAbout">
        <article>
          <h2>about us</h2>
          <p className={styles.h2Sidebar}>熊本のこれからを、共につくる。</p>
          <div className={styles.title}>KUMANICHI GROUP</div>
          <nav>
            <a href="#Group01" className={styles.itemLink}>
              熊日広告社
            </a>
            <a href="#Group01" className={styles.itemLink}>
              熊日サービス開発
            </a>
            <a href="#Group01" className={styles.itemLink}>
              熊日メディアコム
            </a>
            <a href="#Group01" className={styles.itemLink}>
              熊日会館
            </a>
            <a href="#Group01" className={styles.itemLink}>
              熊日デジタル
            </a>
          </nav>
        </article>
      </section>
      <section className={styles.containerMap}>
        <article>
          <Image src={OrganizationalChart} alt="組織図" />
        </article>
      </section>
      <section className={styles.containerGroup}>
        <ContainerGroup />
      </section>
      <section className={styles.containerFlow} id="ContainerFlow">
        <article>
          <h2>flow</h2>
          <ContainerFlow />
        </article>
      </section>
      <section className={styles.containerFaq} id="ContainerFaq">
        <article>
          <h2>faq</h2>
          <ContainerFaq />
        </article>
      </section>
      <section className={styles.containerContact} id="ContainerContact">
        <article className={styles.innerHead}>
          <p>
            エントリーはこちらのHPより履歴書・職務経歴書をダウンロードしていただき必要事項をご記入の上、
          </p>
          <div className={styles.boxContact}>
            <h3>熊本日日新聞社関連企業部採用担当</h3>
            <a href="mailto:gr_saiyou@kumanichi.co.jp">
              gr_saiyou@kumanichi.co.jp
            </a>
          </div>
          <p>
            までお送りください。書類選考を通過された方のみ、2週間以内にご連絡を差し上げます。
          </p>
          <p>※ご応募いただいた書類はご返却できませんのでご了承願います。</p>
        </article>
        <article className={styles.innerFoot}>
          <p>
            〔エントリー書類はこちらから〕履歴書・職務経歴書（ダウンロード）
          </p>
          <a
            href="/data/resume2023.xlsx"
            data-download-mode="DownloadLinks"
            className={styles.linkDl}
            target="_blank"
          >
            エントリーシート
          </a>
        </article>
      </section>
    </>
  );
}

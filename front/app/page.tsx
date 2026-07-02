import styles from './page.module.css';
import Link from 'next/link';
import MainBanner from '@/components/MainBanner/MainBanner';

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebarLeft}>
        <div className={styles.sidebarCard}>
          <Link href="/ranking" className={styles.link}>Рейтинг команд</Link>
          <div className={styles.list}>Скоро</div>
        </div>
        <div className={styles.sidebarCard}>
          <Link href="/events" className={styles.link}>Турниры</Link>
          <div className={styles.list}>Скоро</div>
        </div>
      </aside>
      <main className={styles.mainContent}>
        < MainBanner />
        <div className={styles.card}>Лента новостей (Скоро)</div>
      </main>
      <aside className={styles.sidebarRight}>
        <div className={styles.sidebarCard}>
          <Link href="/matches" className={styles.link}>Матчи дня</Link>
          <div className={styles.list}>Скоро</div>
        </div>
        <div className={styles.sidebarCard}>
          <Link href="/transfers" className={styles.link}>Трансферы</Link>
          <div className={styles.list}>Скоро</div>
        </div>
      </aside>
    </div>
  );
}
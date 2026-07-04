import styles from './page.module.css';
import MainBanner from '@/components/MainBanner/MainBanner';

export default function Home() {
  return (
    <>
      <MainBanner />
      <div className={styles.news}>Лента новостей</div>
    </>
  );
}
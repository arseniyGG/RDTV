import Link from 'next/link';
import styles from './MainBanner.module.css';

export default function MainBanner() {
    const eventId = "xse-pro-league-2026";

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.hero}>
                <div className={styles.liveBadge}>LIVE</div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.mainTitle}>XSE Pro League Guangzhou 2026</h1>
                </div>
            </div>
            <div className={styles.tabsContainer}>
                <Link href={`/events/${eventId}`} className={styles.tab}>
                    Обзор
                </Link>
                <Link href={`/events/${eventId}/matches`} className={styles.tab}>
                    Матчи
                </Link>
                <Link href={`/events/${eventId}/results`} className={styles.tab}>
                    Результаты
                </Link>
            </div>
        </div>
    );
}
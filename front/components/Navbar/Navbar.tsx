import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    RD<span>TV</span>
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li>
                            <Link href="/matches" className={styles.navLink}>Матчи</Link>
                        </li>
                        <li>
                            <Link href="/results" className={styles.navLink}>Результаты</Link>
                        </li>
                        <li>
                            <Link href="/events" className={styles.navLink}>Турниры</Link>
                        </li>
                        <li>
                            <Link href="/ranking" className={styles.navLink}>Рейтинг</Link>
                        </li>
                        <li>
                            <Link href="/transfers" className={styles.navLink}>Трансферы</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.auth}>
                    <button className={styles.steamBtn}>
                        <span>Войти через Steam</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
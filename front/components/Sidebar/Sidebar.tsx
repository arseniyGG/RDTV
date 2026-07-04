import styles from './Sidebar.module.css';
import Link from 'next/link';

interface SidebarWidgetProps {
    title: string;
    href: string;
    children: React.ReactNode;
}

export default function SidebarWidget({ title, href, children }: SidebarWidgetProps) {
    return (
        <div className={styles.sidebarCard}>
            <Link href={href} className={styles.link}>
                {title}
            </Link>
            <div className={styles.list}>
                {children}
            </div>
        </div>
    );
}
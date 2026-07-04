import Link from 'next/link';
import styles from './results.module.css';

interface FinishedMatch {
    match_id: number;
    league_name: string;
    radiant_name: string;
    dire_name: string;
    radiant_score: number;
    dire_score: number;
    date: string;
    winner: string;
    format: string;
}

async function getFinishedMatches(page: number): Promise<FinishedMatch[]> {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/matches/results/${page}`, { cache: 'no-store' });
        if (!res.ok) throw new Error();
        return res.json();
    } catch {
        return [];
    }
}

export default async function ResultsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;
    const finishedMatches = await getFinishedMatches(currentPage);
    const totalPages = 4;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.matchesList}>
                {finishedMatches.length === 0 ? (
                    <p className={styles.errorText}>Матчи на этой странице не найдены или бэкенд отключен.</p>
                ) : (
                    finishedMatches.map((match) => (
                        <div key={match.match_id} className={styles.matchRow}>
                            <div className={styles.metaBlock}>
                                <span className={styles.date}>{match.date}</span>
                                <span className={styles.league}>{match.league_name}</span>
                            </div>

                            <div className={styles.teamsBlock}>
                                <span className={`${styles.team} ${match.winner === 'radiant' ? styles.winner : styles.loser}`}>
                                    {match.radiant_name}
                                </span>
                                <span className={styles.score}>
                                    {match.radiant_score} : {match.dire_score}
                                </span>
                                <span className={`${styles.team} ${match.winner === 'dire' ? styles.winner : styles.loser}`}>
                                    {match.dire_name}
                                </span>
                            </div>

                            <div className={styles.statusBlock}>
                                <span className={styles.formatBadge}>{match.format}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.paginationContainer}>
                <div className={styles.pagination}>
                    {currentPage > 1 ? (
                        <Link href={`/results?page=${currentPage - 1}`} className={styles.arrowBtn}>
                            &lt;
                        </Link>
                    ) : (
                        <span className={`${styles.arrowBtn} ${styles.disabled}`}>&lt;</span>
                    )}
                    {pageNumbers.map((number) => (
                        <Link
                            key={number}
                            href={`/results?page=${number}`}
                            className={`${styles.pageNumberBtn} ${currentPage === number ? styles.activePage : ''}`}
                        >
                            {number}
                        </Link>
                    ))}
                    {currentPage < totalPages ? (
                        <Link href={`/results?page=${currentPage + 1}`} className={styles.arrowBtn}>
                            &gt;
                        </Link>
                    ) : (
                        <span className={`${styles.arrowBtn} ${styles.disabled}`}>&gt;</span>
                    )}
                </div>
            </div>
        </div>
    );
}

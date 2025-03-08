import Image from 'next/image';
import styles from '@/styles/PortfolioHome.module.css';

export default function Card({ imgSrc, title, desc }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <Image src={imgSrc} alt={title} width={400} height={250} />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDesc}>{desc}</p>
      </div>
    </div>
  );
}

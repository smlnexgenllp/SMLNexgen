// pages/404.js
import Link from "next/link";
import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.four_zero_four_bg}>
          <h1>404</h1>
        </div>
        <div className={styles.contant_box_404}>
          <h3>Looks like you&apos;re lost</h3>
          <p>The page you are looking for is not available!</p>
          <Link href="/" className={styles.link_404}>
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

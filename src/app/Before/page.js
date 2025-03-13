// components/page.js
import React from 'react';
import styles from './before.module.css';

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={`${styles.square} ${styles.twitch}`} style={{ marginBottom: '50px' }}>
          <span className={styles.one}></span>
          <span className={styles.two}></span>
          <span className={styles.three}></span>
          <div className={styles.circle}>
            <h2 className={styles.title}>SMLNEXGEN LLP</h2>
          </div>
        </div>
        <a href="#" className={styles.button} target="_parent">
          <span className={styles.actualText}>&nbsp;Explore&nbsp;</span>
          <span className={styles.hoverText} aria-hidden="true">&nbsp;Explore&nbsp;</span>
        </a>
      </div>
    </div>
  );
};

export default page;

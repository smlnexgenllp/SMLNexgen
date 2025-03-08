'use client';

import { useEffect } from 'react';
import styles from '../styles/GlowingText.module.css'; // Import module CSS

const WordAnimation = () => {
  useEffect(() => {
    const spans = document.querySelectorAll(`.${styles.word} span`);
    spans.forEach((span, idx) => {
      span.addEventListener('mouseover', (e) => {
        e.target.classList.add(styles.active);
      });
      span.addEventListener('animationend', (e) => {
        e.target.classList.remove(styles.active);
      });
      setTimeout(() => {
        span.classList.add(styles.active);
      }, 750 * (idx + 1));
    });
  }, []);

  return (
    <div className={styles.container}>
      
      <div className={styles.word}>
        {[...'SMLNEXGENLLP'].map((letter, index) => (
          <span key={index} className={styles.letter}>{letter}</span>
        ))}
      </div>
   
    </div>
  );
};

export default WordAnimation;

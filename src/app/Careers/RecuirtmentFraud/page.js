'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/Recuirtment.module.css';

export default function Home() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const range = 200;
      const headerHeight = 100;
      const offset = headerHeight / 2;
      let calc = 1 - (scrollTop - offset + range) / range;

      if (calc > 1) calc = 1;
      if (calc < 0) calc = 0;
      setOpacity(calc);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <section id="recruitment" className={styles.recruitmentAlert}>
        <h2>Recruitment Fraud Alert</h2>
        <p>
          At <strong style={{ color: '#c0392b' }}>SML NEXGEN LLP</strong>, we prioritize a transparent and legitimate recruitment process. Beware of fraudulent activities by individuals or entities falsely claiming to represent us.
        </p>
        <h3>How to Spot Recruitment Fraud</h3>
        <ul>
          <li><strong>Unsolicited Job Offers:</strong> We never offer jobs without a formal interview.</li>
          <li><strong>Payment Requests:</strong> No fees are ever required for applications or interviews.</li>
          <li><strong>Suspicious Emails:</strong> Official emails come only from [smlnexgenllp@gmail.com].</li>
          <li><strong>Unverified Listings:</strong> Check jobs on our official website.</li>
          <li><strong>Pressure Tactics:</strong> Beware of urgent demands to respond.</li>
        </ul>
        <h3>Protect Yourself</h3>
        <ul>
          <li>Cross-check job openings with trusted job portals or company social media channels.</li>
          <li>Avoid sharing personal info with unverified sources.</li>
          <li>Report suspicious activity to [smlnexgenllp@gmail.com] or local authorities.</li>
        </ul>
        <h3>Our Recruitment Process</h3>
        <ul>
          <li>Vacancies are posted on our official website.</li>
          <li>Applications are accepted via official channels only.</li>
          <li>Interviews are scheduled using official email IDs.</li>
          <li>No payments are required at any stage.</li>
        </ul>
        <p>
          Your safety matters. Stay vigilant and contact us at <strong>[+91-9487084117]</strong> for any concerns.
        </p>
      </section>
    </div>
  );
}
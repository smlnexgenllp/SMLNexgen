'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/Recuirtment.module.css';
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Create animation on mount
    setIsVisible(true);
    
    // Add scroll animation for list items
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add(styles.active);
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerBackground}>
        <div className={styles.alertBanner}>
          <span>⚠️ IMPORTANT SECURITY NOTICE</span>
        </div>
      </div>
      
      <section id="recruitment" className={`${styles.recruitmentAlert} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.securityIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.shieldIcon}>
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12M12 16H12.01" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2>Recruitment Fraud Alert</h2>
        
        <div className={styles.introCard}>
          <p>
            At <strong className={styles.companyName}>SML NEXGEN LLP</strong>, we prioritize a transparent and legitimate recruitment process. Beware of fraudulent activities by individuals or entities falsely claiming to represent us.
          </p>
        </div>
        
        <div className={styles.sectionCard}>
          <h3>How to Spot Recruitment Fraud</h3>
          <ul className={styles.fraudList}>
            <li className={styles.animateOnScroll}><div className={styles.iconWrapper}><span className={styles.icon}>⚠️</span></div><div><strong>Unsolicited Job Offers:</strong> We never offer jobs without a formal interview.</div></li>
            <li className={styles.animateOnScroll}><div className={styles.iconWrapper}><span className={styles.icon}>💰</span></div><div><strong>Payment Requests:</strong> No fees are ever required for applications or interviews.</div></li>
            <li className={styles.animateOnScroll}><div className={styles.iconWrapper}><span className={styles.icon}>📧</span></div><div><strong>Suspicious Emails:</strong> Official emails come only from <span className={styles.highlight}>smlnexgenllp@gmail.com</span>.</div></li>
            <li className={styles.animateOnScroll}><div className={styles.iconWrapper}><span className={styles.icon}>🔍</span></div><div><strong>Unverified Listings:</strong> Check jobs on our official website.</div></li>
            <li className={styles.animateOnScroll}><div className={styles.iconWrapper}><span className={styles.icon}>⏱️</span></div><div><strong>Pressure Tactics:</strong> Beware of urgent demands to respond.</div></li>
          </ul>
        </div>
        
        <div className={styles.sectionCard}>
          <h3>Protect Yourself</h3>
          <ul className={styles.protectList}>
            <li className={styles.animateOnScroll}><div className={styles.numberBadge}>1</div> Cross-check job openings with trusted job portals or company social media channels.</li>
            <li className={styles.animateOnScroll}><div className={styles.numberBadge}>2</div> Avoid sharing personal info with unverified sources.</li>
            <li className={styles.animateOnScroll}><div className={styles.numberBadge}>3</div> Report suspicious activity to <span className={styles.highlight}>smlnexgenllp@gmail.com</span> or local authorities.</li>
          </ul>
        </div>
        
        <div className={styles.sectionCard}>
          <h3>Our Recruitment Process</h3>
          <div className={styles.processContainer}>
            <div className={`${styles.processStep} ${styles.animateOnScroll}`}>
              <div className={styles.processIcon}>📋</div>
              <p>Vacancies are posted on our official website.</p>
            </div>
            <div className={`${styles.processStep} ${styles.animateOnScroll}`}>
              <div className={styles.processIcon}>📝</div>
              <p>Applications are accepted via official channels only.</p>
            </div>
            <div className={`${styles.processStep} ${styles.animateOnScroll}`}>
              <div className={styles.processIcon}>💼</div>
              <p>Interviews are scheduled using official email IDs.</p>
            </div>
            <div className={`${styles.processStep} ${styles.animateOnScroll}`}>
              <div className={styles.processIcon}>🚫</div>
              <p>No payments are required at any stage.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.contactBox}>
          <div className={styles.contactIcon}>📞</div>
          <p>
            Your safety matters. Stay vigilant and contact us at <strong className={styles.phoneNumber}>+91-9487084117</strong> for any concerns.
          </p>
        </div>
        
        <div className={styles.watermark}>
          <p>© SML NEXGEN LLP - Security First</p>
        </div>
      </section>
    </div>
  );
}
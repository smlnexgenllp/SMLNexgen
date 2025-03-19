"use client";
import styles from './mobile.module.css';
import Link from 'next/link';
import {
    FaFacebook,
    FaXTwitter,
    FaLinkedin,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
    FaLocationDot,
    FaPhone
} from 'react-icons/fa6';

export default function MobileFooter() {
    return (
        <div className={styles.container}>
            <footer className={styles.footer}>
                <div className={styles.waves}>
                    <div className={`${styles.wave} ${styles.wave1}`} id="wave1"></div>
                    <div className={`${styles.wave} ${styles.wave2}`} id="wave2"></div>
                    <div className={`${styles.wave} ${styles.wave3}`} id="wave3"></div>
                    <div className={`${styles.wave} ${styles.wave4}`} id="wave4"></div>
                </div>
                
                {/* Address Section */}
                <div className={styles.addressSection}>
                    <h3>Visit Us</h3>
                    <Link 
                        href="https://maps.app.goo.gl/FriRZh1HgECXED12A" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <p className={styles.addressText}>
                           
                            📍2nd floor, JPS Tower, Thally Rd
                            <br />
                            Hosur - 635109, 
                            <br />
                            TamilNadu , India
                        </p>
                        
                    </Link>
                    
                    <div className={styles.contactInfo}>
                        <Link href="tel:+919487084117">
                            <p><FaPhone className={styles.contactIcon} /> (+91) 94870-84117</p>
                        </Link>
                        <Link href="mailto:admin@smlnexgenllp.com">
                            <p><FaEnvelope className={styles.contactIcon} /> admin@smlnexgenllp.com</p>
                        </Link>
                    </div>
                </div>
                
                {/* Social Icons */}
                <ul className={styles.social_icon}>
                    <li><a href="https://www.facebook.com/profile.php?id=61559262780126&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                    <li><a href="https://x.com/SMLnexgen" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a></li>
                    <li><a href="https://www.linkedin.com/company/smlnexgen-llp/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                    <li><a href="https://www.instagram.com/smlnexgen_llp?igsh=NXVtb2xhZDh4ZTl2" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                    <li><a href="https://wa.me/919487084117" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
                </ul>

                {/* Copyright */}
                <p className={styles.copyright}>&copy;{new Date().getFullYear()} SMLNEXGEN LLP | All Rights Reserved</p>
            </footer>
        </div>
    );
}

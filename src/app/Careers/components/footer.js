import { FaMapMarkerAlt, FaPhone, FaEnvelopeOpen, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footerstyle.module.css";

const Footercomponent = () => {
  return (
    <footer className={styles.footer__section}>
      <div className={styles.footer__container}>
        {/* CTA Section */}
        <div className={styles.footer__cta}>
          <div className={styles.footer__ctaItem}>
            <FaMapMarkerAlt className={styles.footer__icon} />
            <div className={styles.footer__ctaText}>
              <h4>Find us</h4>
              <span>
                <a
                  href="https://maps.app.goo.gl/FriRZh1HgECXED12A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3B 2nd floor JPS TOWER, Thally main road, Hosur, Tamil Nadu, India, 635109
                </a>
              </span>
            </div>
          </div>
          <div className={styles.footer__ctaItem}>
            <FaPhone className={styles.footer__icon} />
            <div className={styles.footer__ctaText}>
              <h4>Call us</h4>
              <span>
                <a href="tel:+919487084117">
                  +91-94870-84117
                </a>
              </span>
            </div>
          </div>
          <div className={styles.footer__ctaItem}>
            <FaEnvelopeOpen className={styles.footer__icon} />
            <div className={styles.footer__ctaText}>
              <h4>Mail us</h4>
              <span>
                <a href="mailto:smlnexgenllp@gmail.com">
                  smlnexgenllp@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className={styles.footer__content}>
          {/* Logo & Social Links */}
          <div className={styles.footer__widget}>
            <Link href="/">
              <Image
                src="/sml-logo.png"
                width={100}
                height={50}
                alt="logo"
                className={styles.footer__logo}
              />
            </Link>
            <p>
              We are a tech-driven company dedicated to delivering innovative software solutions tailored to your business needs.
            </p>

            <div className={styles.footer__social}>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </Link>
              <Link href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div className={styles.footer__links}>
            <h3>Useful Links</h3>
            <ul>
              {[
                { name: "Home", url: "/Home" },
                { name: "About", url: "/Home/About" },
                { name: "Services", url: "/Home/Services" },
                { name: "Portfolio", url: "/Home/Portfolio/1" },
                { name: "Contact", url: "/Home/Contact" },
              ].map(({ name, url }) => (
                <li key={name}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footer__bottom}>
        <p>© 2025, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footercomponent;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from '../styles/Client.module.css';
//import { Shadows_Into_Light } from "next/font/google";
// const shadows = Shadows_Into_Light({
//   subsets: ["latin"],
//   weight: "400",
// });

const logos = [
  { id: 1, src: '/cli1.png', alt: 'Coca Cola' },
  { id: 2, src: '/cli3.png', alt: 'Google' },
  { id: 3, src: '/cli4.jpeg', alt: 'AirBnB' },
  { id: 4, src: '/cli16.png', alt: 'Spotify' },
  { id: 5, src: '/cli15.png', alt: 'Guinness' },
];

const LogoGrid = () => {
  const marqueeRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const duration = window.innerWidth < 768 ? 20 : 10; // Adjust speed for mobile

    gsap.to(marquee, {
      x: "-100%",
      duration: duration,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  const handleImageClick = (src) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
      <h1 style={{ fontSize: "34px", color: "#06038D" }}>
        Our Partners / Our Clients
      </h1>
    </div>
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee} ref={marqueeRef}>
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={100} // Adjusted for mobile
              height={60}
              className={styles.logogrid__img}
              onClick={() => handleImageClick(logo.src)}
              unoptimized
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.closeButton} onClick={closeModal}>&times;</span>
          <Image src={selectedImage} alt="Zoomed" width={600} height={400} className={styles.modalImage} unoptimized />
        </div>
      )}
    </div>
  );
};

export default LogoGrid;

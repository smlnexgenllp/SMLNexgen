'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from '../styles/Client.module.css';


const logos = [
  { id: 1, src: '/VI_logo.jpg', alt: 'Venkatesh Interior' },
  { id: 2, src: '/cli2.png', alt: 'SML Fabricators' },
  { id: 3, src: '/cli3.jpeg', alt: 'Sri Hari Agri Tech' },
  { id: 4, src: '/cli4.png', alt: 'Pla' },
  { id: 5, src: '/cli5.png', alt: 'Rayan Wires' },
  { id: 6, src: '/cli6.png', alt: 'Helping Mitra' },
  { id: 7, src: '/cli7.png', alt: 'Sri Atista Vinayakar Jewellers' },
  { id: 8, src: '/cli8.png', alt: 'Kerovit By kajaria' },
  { id: 9, src: '/cli9.png', alt: 'Loki Enterprises' },
  { id: 10, src: '/cli10.png', alt: 'HC' },
  { id: 11, src: '/cli11.png', alt: 'JPK Interio' },
  { id: 12, src: '/cli12.png', alt: 'Auto Mark' },
  
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
        <h1>
          OUR PARTNERS / CLIENTS
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

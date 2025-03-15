"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/TitleAnimation.module.css";

export default function MontoyaText({ title }) {
  const [mouseX, setMouseX] = useState(null);
  const containerRef = useRef(null);
  const TEXT = title.split(""); // Split text into individual letters

  // Detect screen width to adjust animation intensity
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse event handlers
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setMouseX(e.clientX - left);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  // Touch event handlers for mobile
  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const { left } = containerRef.current.getBoundingClientRect();
    setMouseX(touch.clientX - left);
  };

  const handleTouchEnd = () => {
    setMouseX(null);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {TEXT.map((letter, index) => {
        return (
          <motion.span
            key={index}
            className={styles.letter}
            animate={(() => {
              if (mouseX === null) return { y: 0, scaleY: 1 };

              const letterRef = containerRef.current.children[index];
              if (!letterRef) return { y: 0, scaleY: 1 };

              const { left, width } = letterRef.getBoundingClientRect();
              const letterCenterX = left + width / 2 - containerRef.current.getBoundingClientRect().left;
              const distance = Math.abs(mouseX - letterCenterX);
              const factor = Math.max(0, 1 - distance / (isMobile ? 100 : 150)); // Smaller radius on mobile

              return {
                y: factor * (isMobile ? 16 : 32), // Less vertical movement on mobile
                scaleY: 1 + factor * (isMobile ? 0.2 : 0.4), // Less scaling on mobile
              };
            })()}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
}
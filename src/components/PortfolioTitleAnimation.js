"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../styles/TitleAnimation.module.css";

export default function MontoyaText({ title }){
  const [mouseX, setMouseX] = useState(null);
  const containerRef = useRef(null);
  const TEXT = title.split(""); // Split text into individual letters

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    setMouseX(e.clientX - left); // Normalize mouseX relative to the container
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  return (
    <div ref={containerRef} className={styles.container} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
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
              let factor = Math.max(0, 1 - distance / 150); // Scale factor (0 to 1)

              return {
                y: factor * 32,
                scaleY: 1 + factor * 0.4,
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

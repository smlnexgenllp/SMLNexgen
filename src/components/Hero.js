"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/Hero.module.css";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import WordAnimation from "@/components/GlowingText";
gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onBookNow }) => {
  const [currentText, setCurrentText] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const heroRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const texts = [
    "SML NexGen LLP - AI-driven software, Cloud Solution & IT Consulting.",
    "Future-Proof your business with innovative technology.",
    "Contact us Today!. Let's explore together.",
  ];

  // Auto-change text slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection("next");
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentText, texts.length]); // ✅ Add texts.length

  // Animate the overlays as the hero section is scrolled
  useEffect(() => {
    if (
      !heroRef.current ||
      !bottomRef.current ||
      !leftRef.current ||
      !rightRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(bottomRef.current, { height: "40%", ease: "power2.out" }, 0)
      .to(leftRef.current, { width: "20%", ease: "power2.out" }, 0)
      .to(rightRef.current, { width: "20%", ease: "power2.out" }, 0);

    return () => tl.kill();
  }, []);

  const changeText = (direction) => {
    setSlideDirection(direction);
    if (direction === "prev") {
      setCurrentText((prev) => (prev === 0 ? texts.length - 1 : prev - 1));
    } else {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }
  };

  return (
    <div className={styles.heroWrapper} ref={heroRef}>
      <video autoPlay loop muted playsInline className={styles.backgroundVideo}>
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <SocialMedia theme="dark"/> */}
      <section className={styles.hero}>
        <div className={styles.text}>
          <h1>DISCOVER</h1>
          <WordAnimation />
          {/* <h1>SMLNEXGEN LLP</h1> */}

          <div className={styles.textContainer}>
            <FiChevronLeft
              className={styles.arrow}
              onClick={() => changeText("prev")}
            />
            <div className={styles.sliderWrapper}>
              <div
                className={`${styles.textSlider} ${
                  slideDirection === "next"
                    ? styles.slideNext
                    : styles.slidePrev
                }`}
                style={{ transform: `translateX(-${currentText * 100}%)` }}
              >
                {texts.map((text, index) => (
                  <div key={index} className={styles.slide}>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <FiChevronRight
              className={styles.arrow}
              onClick={() => changeText("next")}
            />
          </div>
          <button className={styles.button} onClick={onBookNow}>
            Book Now
          </button>
        </div>
      </section>

      {/* Overlays that will mask the hero content as user scrolls */}
      <div className={styles.heroMaskOverlay}>
        <div className={styles.bottomOverlay} ref={bottomRef}></div>
        <div className={styles.leftOverlay} ref={leftRef}></div>
        <div className={styles.rightOverlay} ref={rightRef}></div>
      </div>
    </div>
  );
};

export default Hero;

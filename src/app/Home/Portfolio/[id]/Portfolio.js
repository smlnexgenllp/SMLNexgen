"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Portfolio.module.css";
import MontoyaText from "@/components/PortfolioTitleAnimation";

export default function Portfolio() {
  const router = useRouter();
  const [activeBox, setActiveBox] = useState(null);
  const containerRef = useRef(null);
  const boxesRef = useRef([]);
  const animationRef = useRef(null); // Track GSAP animation
  const portfolioRef = useRef(null);

  const boxes = [
    {
      id: 1,
      title: "WEB DEVELOPMENT",
      description:
        "SMLNEXGEN LLP offers comprehensive web development services...",
      image: "/vi.gif",
    },
    {
      id: 2,
      title: "APP DEVELOPMENT",
      description:
        "We specialize in creating user-friendly and highly functional mobile and web apps...",
      image: "/vi2.gif",
    },
    {
      id: 4,
      title: "SOFTWARE DEVELOPMENT",
      description:
        "We create custom software tailored to your business needs...",
      image: "/vi4.gif",
    },
    {
      id: 5,
      title: "BUSINESS AUTOMATIONS",
      description:
        "Optimize your workflows and enhance productivity with our automation solutions...",
      image: "/vi5.gif",
    },
    {
      id: 6,
      title: "BUSINESS SOLUTIONS",
      description:
        "Strategic business solutions tailored to meet your unique challenges...",
      image: "/vi6.gif",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const moveBoxes = () => {
      animationRef.current = gsap.to(container, {
        x: "-=320px", // Move left
        duration: 5,
        ease: "linear",
        onComplete: () => {
          if (container.children.length > 0) {
            const firstChild = container.children[0];
            container.appendChild(firstChild); // Move first child to end
            gsap.set(container, { x: 0 }); // Reset position
            moveBoxes();
          }
        },
      });
    };

    moveBoxes();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill(); // Properly stop GSAP animation
      }
      gsap.set(container, { clearProps: "all" }); // Clean up styles
    };
  }, []);

  const handleBoxClick = (index, id) => {
    setActiveBox(index);

    gsap.to(boxesRef.current[index], {
      scale: 1.1, // Smaller zoom to make it faster
      duration: 0.15, // Faster animation
      ease: "power3.out",
      onComplete: () => {
        router.push(`/Home/Portfolio/${id}`);
      },
    });
  };

  return (
    <div>
      {/* Move MontoyaText outside the container for easier positioning */}
      <div className={styles.montoyaTextWrapper}>
        {/* <MontoyaText title="PORTFOLIO" /> */}
      </div>

      <div id="portfolio" ref={portfolioRef} className={styles.container}>
        <div className={styles.section}>
          <h2>PORTFOLIO</h2>

          <div className={styles.boxColumnWrapper}>
            <div className={styles.boxColumn} ref={containerRef}>
              {boxes.map((box, index) => (
                <div
                  key={index}
                  className={`${styles.box} ${
                    activeBox === index ? styles.active : ""
                  }`}
                  ref={(el) => (boxesRef.current[index] = el)}
                  onClick={() => handleBoxClick(index, box.id)}
                >
                  <Image
                    src={box.image}
                    alt={box.title}
                    width={200}
                    height={150}
                    className={styles.image}
                    unoptimized
                  />
                  <h4 className={styles.boxTitle}>{box.title}</h4>
                  <p className={styles.boxText}>{box.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

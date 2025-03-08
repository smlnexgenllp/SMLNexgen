"use client";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Home from "./Home";
import Gallery from "./Gallary";
import styles from "./Page.module.css"; // Updated CSS Module
import "./404.module.css";
import Link from "next/link";
import Portfolio from "@/app/Home/Portfolio/[id]/Portfolio";
//import WordAnimation from "@/components/GlowingText";
//import WhyChooseMe from "@/components/ServiceFeatures";
// Portfolio Data
const boxData = {
  "1": {
    title: "Web Development",
    description:
      "SMLNEXGEN LLP offers top-notch web development services, crafting responsive, SEO-friendly, and secure websites to meet diverse business needs. Whether you require a corporate website, e-commerce platform, or custom web solution, our expert team ensures a seamless, high-performance experience.We specialize in modern UI/UX design, fast loading speeds, and scalable architecture, ensuring optimal user engagement. Our development approach integrates the latest technologies, focusing on functionality, security, and performance optimization.",
    image: "/vi.gif",
  },
  "2": {
    title: "App Development",
    description:
      "At SMLNEXGEN LLP, we specialize in crafting user-friendly, high-performance mobile and web applications tailored to your business needs. Our expert development team transforms your ideas into feature-rich, scalable, and secure digital solutions. We prioritize seamless functionality, intuitive design, and engaging user experiences, ensuring your app stands out in the competitive market. Whether you need a custom web platform, mobile app, or enterprise solution, we deliver cutting-edge technology and innovation to drive success.",
    image: "/vi2.gif",
  },
  "4": {
    title: "Software Development",
    description:
      "SMLNEXGEN LLP develops custom software solutions designed to meet your unique business needs. Our expert team delivers robust, scalable, and secure applications that enhance efficiency and drive growth. From enterprise software to specialized digital solutions, we ensure seamless functionality, high performance, and future-ready technology to help your business stay ahead.",
    image: "/vi4.gif",
  },
  "5": {
    title: "Business Automations",
    description:
      "SMLNEXGEN LLP specializes in developing custom software solutions tailored to your unique business needs. Our expertise ensures robust, scalable, and secure applications that enhance operational efficiency and drive business growth. From enterprise systems to innovative digital solutions, we deliver high-performance, future-ready technology to help you stay ahead in a competitive landscape.",
    image: "/vi5.gif",
  },
  "6": {
    title: "Business Solutions",
    description:
      "SMLNEXGEN LLP delivers custom business solutions tailored to your unique challenges. We provide strategic planning, implementation, and cutting-edge tools to help you succeed in a competitive market.Our expertise spans process optimization, digital transformation, and enterprise solutions, ensuring efficiency, scalability, and growth. With a focus on innovation and performance, we empower businesses to stay ahead and achieve long-term success.",
    image: "/vi6.gif",
  },
};

export default function PortfolioPage() {
  const { id } = useParams();
  const box = boxData[id];
  const contentRef = useRef(null);

  // Scroll to the content on page load
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [id]); // Re-run when the ID changes

  if (!box) {
    return (
      <section className={styles.page_404}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col_sm_12}>
              <div className={`${styles.col_sm_10} ${styles.text_center}`}>
                <div className={styles.four_zero_four_bg}>
                  <h1>404</h1>
                </div>
                <div className={styles.contant_box_404}>
                  <h3>{"Looks like you're lost"}</h3>
                  <p>The page you are looking for is not available!</p>
                  <Link href="/" className={styles.link_404}>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Portfolio />

      {/* Scroll target */}
      <div ref={contentRef} className={styles.contentWrapper}>
        {/* Responsive Content Layout */}
        <div className={styles.flexContainer}>
          {/* Left Side - Image/GIF */}
          <div className={styles.imageContainer}>
            <Image
              src={box.image}
              alt={box.title}
              width={500}
              height={350}
              className={styles.responsiveImage}
              priority
              unoptimized
            />
          </div>

          {/* Right Side - Text Content */}
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{box.title}</h1>
            <p className={styles.description}>{box.description}</p>
          </div>
        </div>

        {/* Include Gallery & Home Content */}
        <div className={styles.galleryWrapper}>
          <Gallery />
          <Home />
        {/* <WordAnimation /> */}
        {/* <WhyChooseMe /> */}
        </div>
      </div>
    </>
  );
}

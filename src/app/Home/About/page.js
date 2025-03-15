"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/Aboutus.module.css";
import { CountUp } from "countup.js";
import SocialMedia from "@/components/SocialMedia";
import { motion } from "framer-motion";
// import Footer from "@/components/Footer/Footer";
import MontoyaText from "@/components/PortfolioTitleAnimation";
const AboutUs = () => {
  const countUpRef1 = useRef(null);
  const countUpRef2 = useRef(null);
  const countUpRef3 = useRef(null);
  const countUpRef4 = useRef(null);
  const countUpSectionRef = useRef(null);
  const hasCounted = useRef(false);

  // Animation variants for timeline items
  const timelineVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted.current) {
          hasCounted.current = true;

          new CountUp(countUpRef1.current, 50, {
            startVal: 0,
            duration: 2.5,
            suffix: "+",
          }).start();
          new CountUp(countUpRef2.current, 50, {
            startVal: 0,
            duration: 2.5,
            suffix: "+",
          }).start();
          new CountUp(countUpRef3.current, 1, {
            startVal: 0,
            duration: 2.5,
            suffix: "+",
          }).start();
          new CountUp(countUpRef4.current, 100, {
            startVal: 0,
            duration: 2.5,
            suffix: "%",
          }).start();
        }
      },
      { threshold: 0.3 }
    );

    if (countUpSectionRef.current) {
      observer.observe(countUpSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.montoyaTextWrapper}>
        {/* <MontoyaText title="ABOUT US" /> */}
      </div>
      <section id="about" className={styles.section}>
        <SocialMedia theme="dark" />
        <h1>ABOUT US</h1>
        <h2 className={styles.heading}>
          Meet the Experts{" "}
          <span className={styles.blueText}>Behind SML NexGen LLP</span>
        </h2>
        <p className={styles.description}>
          Meet SML NexGen LLP - leaders in AI, Software and Cloud Innovation.
          Learn how we transform businesses with cutting-edge technology.
        </p>

        {/* Timeline Section with Motion Effect */}
        <div className={styles.timeline}>
          <motion.div
            className={styles.timelineItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={timelineVariant}
          >
            <motion.div
              className={styles.contentLeft}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)",
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 100, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                Our mission is to provide innovative software solutions for
                excellence and enterprise compliance.
              </motion.p>
            </motion.div>
            <div className={styles.circleContainer}>
              <motion.div
                className={styles.circle}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Mission
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={styles.timelineItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <div className={styles.circleContainer}>
              <motion.div
                className={styles.circle}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Vision
              </motion.div>
            </div>
            <motion.div
              className={styles.contentRight}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)",
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 100, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                Our vision is to become businesses’ first choice in software
                development and maintenance.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.whatWeDoSection}>
          <h2>What We Do</h2>
          <motion.div
            className={styles.whatWeDoCards}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Website Development Card */}
            <motion.div
              className={styles.whatWeDoCard}
              initial={{ opacity: 0, y: 100, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)",
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <h3>Website Development</h3>
              <p>
                Creating responsive, dynamic websites that engage your audience.
              </p>
            </motion.div>

            {/* Mobile App Development Card */}
            <motion.div
              className={styles.whatWeDoCard}
              initial={{ opacity: 0, y: 100, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)",
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <h3>Mobile App Development</h3>
              <p>
                Building intuitive and scalable mobile applications for Android
                and iOS.
              </p>
            </motion.div>

            {/* Software Development Card */}
            <motion.div
              className={styles.whatWeDoCard}
              initial={{ opacity: 0, y: 100, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)",
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <h3>Software Development</h3>
              <p>
                Delivering bespoke software solutions to streamline operations.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div ref={countUpSectionRef} className={styles.countUpSection}>
          <div className={styles.countUpItem}>
            <span ref={countUpRef1}>0</span>
            <p>Targeted Happy Clients</p>
          </div>
          <div className={styles.countUpItem}>
            <span ref={countUpRef2}>0</span>
            <p>Projects</p>
          </div>
          <div className={styles.countUpItem}>
            <span ref={countUpRef3}>0</span>
            <p>Years of Expertise</p>
          </div>
          <div className={styles.countUpItem}>
            <span ref={countUpRef4}>0</span>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

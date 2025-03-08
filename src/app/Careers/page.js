"use client";
import { useEffect } from "react";
import styles from "./styles/career.module.css";
import Image from "next/image";

const ScrollIcon = () => {
  const handleClick = () => {
    const target = document.getElementById("slide");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <div className={styles.scrollIcon} onClick={handleClick}></div>;
};

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className={`${styles.landingPage} ${styles.section}`}>
        <section className={styles.sectionContent}>
          <h1>
            <span>Careers</span>
          </h1>
          <p>
            <span>Let&apos;s Build the Future Together.</span>
          </p>
          <p>
            <span>Since 2024</span>
          </p>
        </section>
        <div id="smlname" className={styles.smlname}>
          <p>SML</p>
        </div>
        <div id="ScrollDown" className={styles.scrollDown}>
          <ScrollIcon />
        </div>
      </div>

      <div className={`${styles.slide1} ${styles.section}`}>
        <div id="slide" className={styles.slide}>
          <h1>Lets Grow Together!</h1>
          <p>
            At SML NexGen, we believe in pushing boundaries and creating
            next-generation solutions that drive innovation. We are a team of
            passionate professionals committed to excellence, creativity, and
            continuous learning. If you’re looking for an exciting career where
            your ideas matter, your skills are valued, and your growth is
            prioritized, you’ve come to the right place.
          </p>
        </div>
        <div id="ImageContainer" className={styles.imageContainer}>
          <Image src="/grow.jpg" alt="Grow Together" width={500} height={300} />
        </div>
      </div>

      <div className={`${styles.slide2} ${styles.section}`}>
        <div id="ImageContainer" className={styles.imageContainer}>
          <Image src="/Careers/why.png" alt="Why SMLNEXGEN" width={500} height={300} />
        </div>
        <div id="slide" className={styles.slide}>
          <h1>Why SMLNEXGEN?</h1>
          <p>
            Life at SML NexGen is about innovation, teamwork, and growth. We
            work together to create a space where everyone can succeed. We
            welcome new ideas and support each other as a team. Learning is
            important to us, so we offer training, workshops, and mentorship.
            Hard work is always appreciated and rewarded. We value diversity
            because different ideas make us better. We also make time for fun
            with team outings and activities. With flexible work options, we
            help maintain a good work-life balance, making SML NexGen a great
            place to work.
          </p>
        </div>
      </div>

      <div className={`${styles.slide3} ${styles.section}`}>
        <div id="slide" className={styles.slide}>
          <h1>Life at SMLNEXGEN</h1>
          <p>
            At SML NexGen, we focus on innovation, teamwork, and growth. We
            welcome new ideas and use the latest technology to stay ahead.
            Working together is key to our success, helping everyone do their
            best. We support learning through training, workshops, and
            mentorship to help careers grow. Hard work is always noticed, and we
            celebrate achievements. We value diversity, as different ideas bring
            creativity. Our workplace is fun with team outings and activities.
            With flexible work options, we ensure a good work-life balance,
            making SML NexGen a great place to grow and succeed.
          </p>
        </div>
        <div id="ImageContainer" className={styles.imageContainer}>
          <Image src="/Careers/life3.png" alt="Life of SMLNexGen" width={500} height={300} />
        </div>
      </div>

      {/* Employee Testimonials Section */}
      <div className={`${styles.testimonialsSection} ${styles.section}`}>
        <section className={styles.testimonials}>
          <h2 className={styles.testimonials__sectionHeader}>
            Employee Testimonials
          </h2>
          <div className={styles.testimonials__testimonialSection}>
            <div className={styles.testimonials__testimonial}>
              <h4>
                <i className="fas fa-quote-left"></i> Dream Team &amp; Cloud
                Excellence
              </h4>
              <p>
                &quot;Joining Entrivis was the best decision of my career. The
                culture fosters innovation and collaboration, and the projects
                are cutting-edge.&quot;
              </p>
              <p className={styles.testimonials__employeeName}>
                Alejandro M., Cloud Architect
              </p>
            </div>

            <div className={styles.testimonials__testimonial}>
              <h4>
                <i className="fas fa-quote-left"></i> Growth &amp; Innovation
              </h4>
              <p>
                &quot;As a certified AWS expert, Entrivis offered me the opportunity
                to work on large-scale cloud optimization projects.&quot;
              </p>
              <p className={styles.testimonials__employeeName}>
                Mei Ling, Senior Cloud Negotiator
              </p>
            </div>

            <div className={styles.testimonials__testimonial}>
              <h4>
                <i className="fas fa-quote-left"></i> Empowering Environment
              </h4>
              <p>
                &quot;Working with Entrivis has provided me with the flexibility to
                work remotely while still contributing to exciting cloud and AI
                projects.&quot;
              </p>
              <p className={styles.testimonials__employeeName}>
                Laila A., Software Developer
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className={`${styles.slide4} ${styles.section}`} id="target-section">
        <div id="ImageContainer" className={styles.imageContainer}>
          <Image src="/hiring.jpg" alt="Hiring Process" width={500} height={300} />
        </div>

        <div id="slide" className={styles.slide}>
          <h1 className={styles.hire}>Hiring Process</h1>
          <div className={styles.hiringFlow}>
            {[
              { icon: "fas fa-file-alt", text: "Your application" },
              { icon: "fas fa-search", text: "Initial Screening" },
              { icon: "fas fa-comments", text: "Interview" },
              { icon: "fas fa-handshake", text: "Final decision and offer" },
              { icon: "fas fa-building", text: "Onboarding" },
            ].map((step, index, arr) => (
              <>
                <div className={styles.hiringStep} key={index}>
                  <i className={step.icon}></i>
                  <span>{step.text}</span>
                </div>
                {index < arr.length - 1 && (
                  <div className={styles.connectingLine}></div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

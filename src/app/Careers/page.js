"use client";
import { useEffect } from "react";
// import CareerSections from './CareerSections'; // Import the new component
import styles from "./styles/career.module.css";
import Image from "next/image";

const ScrollIcon = () => {
  const handleClick = () => {
    const target = document.getElementById("growth-section");
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

      <section
        className={`${styles.careerSection} ${styles.section}`}
        id="growth-section"
      >
        <div className={styles.container}>
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Let&apos;s Grow Together</h2>
            <div className={styles.contentDivider}></div>
            <p className={styles.sectionText}>
              At SML NexGen, we believe in pushing boundaries and creating
              next-generation solutions that drive innovation. We are a team of
              passionate professionals committed to excellence, creativity, and
              continuous learning. If you&apos;re looking for an exciting career
              where your ideas matter, your skills are valued, and your growth
              is prioritized, you&apos;ve come to the right place.
            </p>
            <div className={styles.ctaButton}>
              <span>Explore Opportunities</span>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
          <div className={styles.imageBox}>
            <div className={styles.imageWrapper}>
              <Image
                src="/grow.jpg"
                alt="Grow Together"
                width={600}
                height={400}
                className={styles.sectionImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why SML Section */}
      <section
        className={`${styles.careerSection} ${styles.section} ${styles.altSection}`}
        id="why-section"
      >
        <div className={styles.container}>
          <div className={styles.imageBox}>
            <div className={styles.imageWrapper}>
              <Image
                src="/Careers/why.png"
                alt="Why SMLNEXGEN"
                width={600}
                height={400}
                className={styles.sectionImage}
              />
            </div>
          </div>
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Why SMLNEXGEN?</h2>
            <div className={styles.contentDivider}></div>
            <p className={styles.sectionText}>
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
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <i className="fas fa-rocket"></i>
                <span>Innovation</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-users"></i>
                <span>Teamwork</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-graduation-cap"></i>
                <span>Growth</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-balance-scale"></i>
                <span>Work-Life Balance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life at SML Section */}
      <section
        className={`${styles.careerSection} ${styles.section}`}
        id="life-section"
      >
        <div className={styles.container}>
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Life at SMLNEXGEN</h2>
            <div className={styles.contentDivider}></div>
            <p className={styles.sectionText}>
              At SML NexGen, we focus on innovation, teamwork, and growth. We
              welcome new ideas and use the latest technology to stay ahead.
              Working together is key to our success, helping everyone do their
              best. We support learning through training, workshops, and
              mentorship to help careers grow. Hard work is always noticed, and
              we celebrate achievements. We value diversity, as different ideas
              bring creativity. Our workplace is fun with team outings and
              activities. With flexible work options, we ensure a good work-life
              balance, making SML NexGen a great place to grow and succeed.
            </p>
            <div className={styles.lifestyleGrid}>
              <div className={styles.lifestyleItem}>
                <i className="fas fa-lightbulb"></i>
                <p>Creative Environment</p>
              </div>
              <div className={styles.lifestyleItem}>
                <i className="fas fa-hands-helping"></i>
                <p>Supportive Culture</p>
              </div>
              <div className={styles.lifestyleItem}>
                <i className="fas fa-chart-line"></i>
                <p>Career Growth</p>
              </div>
              <div className={styles.lifestyleItem}>
                <i className="fas fa-puzzle-piece"></i>
                <p>Challenging Projects</p>
              </div>
            </div>
          </div>
          <div className={styles.imageBox}>
            <div className={styles.imageWrapper}>
              <Image
                src="/Careers/life3.png"
                alt="Life of SMLNexGen"
                width={600}
                height={400}
                className={styles.sectionImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials Section */}
      <div className={`${styles.testimonialsSection} ${styles.section}`}>
        <section className={styles.testimonials}>
          <h2 className={styles.testimonials__sectionHeader}>
            Employee Testimonials
          </h2>
          <div className={styles.testimonials__testimonialSection}>
            <div className={styles.testimonials__testimonial}>
              <h4>
                <i className="fas fa-quote-left"></i> Career Development
              </h4>
              <p>
                &quot;Joining as a fresh graduate, I&apos;ve grown exponentially in
                my first year. The supportive team and clear career paths have
                been invaluable!&quot;
              </p>
              <p className={styles.testimonials__employeeName}>
                Elavarasan., Developer
              </p>
            </div>

            <div className={styles.testimonials__testimonial}>
              <h4>
                <i className="fas fa-quote-left"></i> Inclusive Leadership &amp;
                Impactful HR
              </h4>
              <p>
                &quot;The company&apos;s leadership is approachable and truly values
                HR&apos;s perspective. It&apos;s empowering to have my voice heard and
                contribute meaningfully to the organization&apos;s success.&quot;
              </p>
              <p className={styles.testimonials__employeeName}>
                Paramaleshwari., Talent Acquisition
              </p>
            </div>

            <div className={styles.testimonials__testimonial}>
              <h4>
                <i className="fas fa-quote-left"></i> Supportive Growth
              </h4>
              <p>
                &quot;In my time as an admin, I&apos;ve experienced tremendous
                growth, thanks to an incredibly supportive and patient team.
                Their guidance has helped me develop valuable new skills.&quot;
              </p>
              <p className={styles.testimonials__employeeName}>Siva., Admin</p>
            </div>
          </div>
        </section>
      </div>

      <div className={`${styles.slide4} ${styles.section}`}>
        <div id="ImageContainer" className={styles.imageContainer}>
          <Image
            src="/hiring.jpg"
            alt="Hiring Process"
            width={600}
            height={400}
          />
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

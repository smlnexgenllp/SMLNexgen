"use client";
import { useParams } from "next/navigation";
import Head from "next/head";
import styles from "../../../../styles/PortfolioHome.module.css";
import ProgressBar from "./ProgressBar";
import Card from "./PortfolioCard";


const contentData = {
  "1": {
    title: "Expert Web Development for Your Business Needs",
    description: "At SMLNEXGEN LLP, we specialize in creating dynamic and responsive websites that drive engagement and conversion.",
    section1: [
      { imgSrc: "/Portfolio/id901.webp", title: "Custom Web Development", desc: "Transform your online presence with our custom web development services, designed to create stunning, high-performance websites that engage users and drive results." },
      { imgSrc: "/Portfolio/id902.webp", title: "Front-End Development", desc: "Enhance user interaction with our front-end development services, designed to create seamless, responsive, and visually engaging experiences." },
      { imgSrc: "/Portfolio/id903.webp", title: "Back-End Development", desc: " We design secure, high-performance architectures that ensure seamless data processing, efficient APIs, and smooth system integrations." }
    ],
    section2: [
      { imgSrc: "/Portfolio/cu1.png", title: "Custom Web Development", desc: "Craft intuitive and visually appealing user experiences." },
      { imgSrc: "/Portfolio/cu2.png", title: "E-Commerce Solutions", desc: "Launch a robust online store with seamless shopping experiences." },
      { imgSrc: "/Portfolio/cu3.png", title: "Responsive Web Design", desc: "Ensure your website looks great on all devices with our responsive designs." },
      { imgSrc: "/Portfolio/cu4.webp", title: "UI/UX Design", desc: "Create visually stunning and user-friendly interfaces that captivate your audience." },
      { imgSrc: "/Portfolio/cu9.png", title: "Web Hosting", desc: "Reliable hosting solutions with high uptime and fast performance." },
      { imgSrc: "/Portfolio/cu6.png", title: "Web Security", desc: "Protect your website with our advanced security solutions." }
    ]
  },
  "2": {
    title: "Top-Tier Mobile App Development Services",
    description: "Transform your ideas into high-performing mobile apps with SMLNEXGEN LLP. Our expert team delivers innovative app solutions, ensuring seamless performance across iOS and Android platforms with a focus on user experience and functionality.",
    section1: [
      { imgSrc: "/Portfolio/id202.png", title: "Custom Mobile Apps", desc: "Unlock new opportunities with our custom mobile app development services. We build high-performance, user-friendly apps for iOS and Android, tailored to your business needs and customer preferences." },
      { imgSrc: "/Portfolio/id904.webp", title: "Cross-Platform Development", desc: "Reach a broader audience with our cross-platform app development services. We create apps that work seamlessly across multiple platforms, providing a consistent experience for all users." },
      { imgSrc: "/Portfolio/id910.webp", title: "App Maintenance & Support", desc: "Ensure your app’s ongoing performance with our maintenance and support services. We offer regular updates, bug fixes, and technical support to keep your app running smoothly and efficiently." }
    ],
    section2: [
      { imgSrc: "/Portfolio/id20.png", title: "iOS App Development", desc: "Create sleek and responsive iOS apps tailored for Apple devices." },
      { imgSrc: "/Portfolio/id29.webp", title: "Android App Development", desc: "Build dynamic and scalable apps for Android devices." },
      { imgSrc: "/Portfolio/id23.png", title: "Cross-Platform Development", desc: "Develop apps that run smoothly across multiple platforms." },
      { imgSrc: "/Portfolio/id222.png", title: "Cloud Integration", desc: "Enhance app performance with seamless cloud integration." },
      { imgSrc: "/Portfolio/id25.png", title: "API Integration", desc: "Integrate powerful APIs to enhance app functionality." },
      { imgSrc: "/Portfolio/id26.png", title: "App Testing & Maintenance", desc: "Ensure your app is bug-free and running smoothly with our testing and maintenance." }
    ]
  },
  "4": {
    title: "Innovative Software Development for Modern Business",
    description: "SMLNEXGEN LLP offers comprehensive software development services to meet your unique business needs. From custom software solutions to system integrations, we deliver reliable and scalable software that enhances your operational efficiency.",
    section1: [
      { imgSrc: "/Portfolio/id906.webp", title: "Custom Software", desc: "Unlock your business potential with our custom software solutions. We develop software tailored to your unique needs, helping you improve efficiency and achieve your business objectives." },
      { imgSrc: "/Portfolio/id905.webp", title: "Database Solutions", desc: "Manage your data effectively with our database solutions. We design and implement scalable database systems that ensure data integrity, security, and accessibility for your business operations." },
      { imgSrc: "/Portfolio/id907.webp", title: "Cloud Integration", desc: "Enhance your business operations with our cloud integration services. We help you migrate to the cloud, ensuring seamless integration with your existing systems and optimizing your IT infrastructure. " }
    ],
    section2: [
      { imgSrc: "/Portfolio/id31.webp", title: "Enterprise Software", desc: "Develop scalable and robust software tailored to your business needs." },
      { imgSrc: "/Portfolio/id32.webp", title: "CRM Development", desc: "Build custom CRM solutions to manage customer relationships effectively." },
      { imgSrc: "/Portfolio/id33.webp", title: "ERP Development", desc: "Streamline your operations with custom ERP solutions." },
      { imgSrc: "/Portfolio/id34.png", title: "Business Intelligence", desc: "Leverage data to make informed decisions with our BI solutions." },
      { imgSrc: "/Portfolio/id35.png", title: "Startup Solutions", desc: "Empower your startup with custom software built for growth." },
      { imgSrc: "/Portfolio/id37.png", title: "Software Security", desc: "Protect your software assets with our comprehensive security services" }
    ]
  },
  "5": {
    title: "Streamline Operations with Business Automation",
    description: "Enhance your business efficiency with SMLNEXGEN LLP's business automation services. We offer solutions that automate repetitive tasks, optimize workflows, and integrate various business processes to boost productivity and reduce operational costs.",
    section1: [
      { imgSrc: "/Portfolio/id403.webp", title: "Workflow Automation", desc: "Streamline your business processes with our workflow automation solutions. We design automated workflows that reduce manual effort, increase efficiency, and ensure consistent performance.." },
      { imgSrc: "/Portfolio/id402.png", title: "Process Optimization", desc: "Optimize your business processes with our expert solutions. We analyze your current processes and implement automation strategies that enhance productivity and operational efficiency." },
      { imgSrc: "/Portfolio/id404.webp", title: "Systems Integration", desc: "Integrate your business systems seamlessly with our integration services. We ensure that your various systems communicate effectively, improving data flow and reducing operational silos." }
    ],
    section2: [
      { imgSrc: "/Portfolio/id40.png", title: "Process Automation", desc: "Automate repetitive tasks and boost productivity." },
      { imgSrc: "/Portfolio/id42.png", title: "Workflow Management", desc: "Streamline your business processes with custom workflows." },
      { imgSrc: "/Portfolio/id41.png", title: "Data Management", desc: "Manage your business data effectively and efficiently." },
      { imgSrc: "/Portfolio/id43.png", title: "Security Automation", desc: "Enhance your security protocols with automation." },
      { imgSrc: "/Portfolio/id48.jpg", title: "Cloud Automation", desc: "Optimize your cloud infrastructure with automation tools." },
      { imgSrc: "/Portfolio/id47.webp", title: "Custom Automation Solutions", desc: "Develop custom automation solutions tailored to your business needs." }
    ]
  },
  "6": {
    title: "Comprehensive Business Solutions for Growth",
    description: "SMLNEXGEN LLP provides a wide range of business solutions designed to meet your strategic goals. From consultancy to implementation, our solutions help businesses adapt to market changes, improve operations, and achieve sustainable growth.",
    section1: [
      { imgSrc: "/Portfolio/id405.webp", title: "Consulting Services", desc: "Get expert advice with our consulting services. We provide strategic guidance and solutions tailored to your business needs, helping you navigate challenges and seize opportunities." },
      { imgSrc: "/Portfolio/id406.webp", title: "Strategic Planning", desc: "Develop a clear and actionable strategy with our planning services. We work with you to define goals, assess market opportunities, and create a roadmap that drives business success." },
      { imgSrc: "/Portfolio/id407.webp", title: "Innovative Solutions", desc: "Discover innovative solutions tailored to your business challenges. We leverage the latest technologies and industry insights to provide creative and effective solutions that drive growth." }
    ],
    section2: [
      { imgSrc: "/Portfolio/id61.png", title: "Business Strategy", desc: "Develop scalable and robust software tailored to your business needs." },
      { imgSrc: "/Portfolio/id62.webp", title: "Customer Management", desc: "Build custom CRM solutions to manage customer relationships effectively." },
      { imgSrc: "/Portfolio/id63.png", title: "Marketing Solutions", desc: "Streamline your operations with custom ERP solutions." },
      { imgSrc: "/Portfolio/id64.png", title: "Global Expansion", desc: "Leverage data to make informed decisions with our BI solutions." },
      { imgSrc: "/Portfolio/id65.png", title: "Digital Transformation", desc: "Empower your startup with custom software built for growth." },
      { imgSrc: "/Portfolio/id66.png", title: "Operational Efficiency", desc: "Protect your software assets with our comprehensive security services" }
    ]
  },
};

export default function Home() {
  const params = useParams();
  const id = params?.id || "1"; // Default to ID 1 if not found
  const content = contentData[id] || contentData["1"]; // Fallback to default

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
      </Head>

      <main className={styles.mainContainer}>
        <header className={styles.header}>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className="main-container">
            {/* Left - Progress Bar */}
            <div className="progress-container">
              <ProgressBar />
            </div>
          </div>

        </header>

        <div className={styles.divider}></div>

        {/* Section 1: 3 Cards */}
        <section style={{ marginTop: "1px" }}> {/* Added margin-top */}
          <h4 className={styles.title}>{content.title}</h4>
          <div className={styles.cardRow} style={{ marginTop: "50px" }}>
            {content.section1.map((card, index) => (
              <Card key={index} imgSrc={card.imgSrc} title={card.title} desc={card.desc} />
            ))}
          </div>
        </section>

        {/* Section 2: 6 Cards in Grid */}
        <section className={styles.section2}>
          <h4 className={styles.title}>Innovative Solutions</h4>
          <div className={styles.cardGrid}>
            {content.section2.map((card, index) => (
              <Card key={index} imgSrc={card.imgSrc} title={card.title} desc={card.desc} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

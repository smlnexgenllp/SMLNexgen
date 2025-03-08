"use client"; // Required for client-side interactivity

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react"; // Replaced all react-icons imports with Iconify
import styles from "../styles/Openings.module.css";
import { useRouter } from "next/navigation";

const Openings = () => {
  const [jobs, setJobs] = useState([]);
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const wrapperRef = useRef(null);

  const router = useRouter();

  // Fetch jobs from backend on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://192.168.0.197:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Handle navigation to application form with job ID
  const handleApplyClick = (jobId) => {
    router.push(`/Careers/Applyform?jobId=${jobId}`);
  };

  // Compute filtered jobs based on search input
  const searchWords = searchTerm.trim().toLowerCase().split(/\s+/);
  const filteredJobs = jobs.filter(job =>
    searchWords.every(word => job.title.toLowerCase().includes(word))
  );

  // Add shadow to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current.scrollTop > 30) {
        wrapperRef.current.classList.add(styles.headerShadow);
      } else {
        wrapperRef.current.classList.remove(styles.headerShadow);
      }
    };
    const wrapper = wrapperRef.current;
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking a job card
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailView(true);
    const number = Math.floor(Math.random() * 10);
    const url = `https://unsplash.it/640/425?image=${number}`;
    setBgImage(url);
    if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
  };

  // Handle returning to the job list view
  const handleBack = () => {
    setIsDetailView(false);
    setSelectedJob(null);
    if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading1}>Be Part of Our Innovation Journey</h1>
        <h2 className={styles.heading2}>Current Opportunities</h2>
      </div>
      <div className={styles.page}>
        <div
          className={`${styles.wrapper} ${isDetailView ? styles.detailPage : ""}`}
          ref={wrapperRef}
        >
          <div className={styles.searchMenu}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchBox}
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.searchButton}>Find Job</button>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.searchType}>
              <div className={styles.alert}>
                <div className={styles.alertTitle}>Create Job Alert</div>
                <div className={styles.alertSubtitle}>
                  Create a job alert now and never miss a job
                </div>
                <input type="text" placeholder="Enter Email" />
                <button className={styles.searchButtons}>
                  Create Job Alerts
                </button>
              </div>
              {/* Simplified job cards in detail view */}
              {isDetailView && (
                <div className={styles.simplifiedJobCards}>
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`${styles.simplifiedJobCard} ${selectedJob && selectedJob.id === job.id
                        ? styles.selected
                        : ""
                        }`}
                      onClick={() => handleJobClick(job)}
                    >
                      <div className={styles.jobCardHeader}>
                        <div className={styles.simplifiedLogo}><Icon icon={job.logo} width="24" height="24" style={{ color: job.bgColor || "#000" }} /></div>
                      </div>
                      <div className={styles.jobCardTitle}>{job.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.searchedJobs}>
              {!isDetailView ? (
                <>
                  <div className={styles.searchedBar}>
                    <div className={styles.searchedShow}>
                      Showing {filteredJobs.length} Jobs
                    </div>
                  </div>
                  <div className={styles.jobCards}>
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className={styles.jobCard}
                        onClick={() => handleJobClick(job)}
                      >
                        <div className={styles.jobCardHeader}>
                          <Icon icon={job.logo} width="48" height="48" style={{ color: job.bgColor || "#000" }} />
                          <div className={styles.menuDot}></div>
                        </div>
                        <div className={styles.jobCardTitle}>{job.title}</div>
                        <div className={styles.jobCardSubtitle}>
                          {job.subtitle}
                        </div>
                        <div className={styles.jobDetailButtons}>
                          <button className={styles.detailButton}>
                            {job.details.time}
                          </button>
                          <button className={styles.detailButton}>
                            {job.details.experience}
                          </button>
                          <button className={styles.detailButton}>
                            {job.details.level}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.jobOverview}>
                  <div className={styles.jobExplain}>
                    <div className={styles.closeBtn} onClick={handleBack}>
                      &times;
                    </div>
                    <Image
                      className={styles.jobBg}
                      src={bgImage}
                      alt="Job Background"
                      style={{
                        backgroundColor: selectedJob ? selectedJob.bgColor : "",
                      }}
                      width={640}
                      height={425}
                    />
                    <div className={styles.jobLogos}>
                      {selectedJob && (
                        <Icon
                          icon={selectedJob.logo}
                          width="48"
                          height="48"
                          style={{ color: selectedJob.bgColor || "#000" }}
                        />
                      )}
                    </div>
                    <div className={styles.jobExplainContent}>
                      <div className={styles.jobTitleWrapper}>
                        <div className={styles.jobCardTitle}>
                          {selectedJob ? selectedJob.title : ""}
                        </div>
                        <div className={styles.jobAction}>
                          <svg
                            className={styles.heart}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                          </svg>
                        </div>
                      </div>
                      <div className={styles.jobSubtitleWrapper}>
                        <div className={styles.posted}>
                          Posted 8 days ago{" "}
                        </div>
                      </div>
                      <div className={styles.explainBar}>
                        <div className={styles.explainContents}>
                          <div className={styles.explainTitle}>Experience</div>
                          <div className={styles.explainSubtitle}>
                            {selectedJob ? selectedJob.details.experience : ""}
                          </div>
                        </div>
                        <div className={styles.explainContents}>
                          <div className={styles.explainTitle}>Work Level</div>
                          <div className={styles.explainSubtitle}>
                            {selectedJob ? selectedJob.details.level : ""}
                          </div>
                        </div>
                        <div className={styles.explainContents}>
                          <div className={styles.explainTitle}>Employee Type</div>
                          <div className={styles.explainSubtitle}>
                            {selectedJob ? selectedJob.details.time : ""}
                          </div>
                        </div>
                        <div className={styles.explainContents}>
                          <div className={styles.explainTitle}>Offer Salary</div>
                          <div className={styles.explainSubtitle}>
                            {selectedJob ? selectedJob.details.salary : ""}
                          </div>
                        </div>
                      </div>
                      <div className={styles.overviewText}>
                        <div className={styles.overviewTextHeader}>Overview</div>
                        <div className={styles.overviewTextSubheader}>
                          {selectedJob ? selectedJob.details.overview : ""}
                        </div>
                      </div>
                      <div className={styles.overviewText}>
                        <div className={styles.overviewTextHeader}>
                          Job Description
                        </div>
                        {selectedJob &&
                          selectedJob.details.description.map((item, index) => (
                            <div key={index} className={styles.overviewTextItem}>
                              {item}
                            </div>
                          ))}
                      </div>
                      <button className={styles.cardButtons} onClick={handleApplyClick}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Openings;

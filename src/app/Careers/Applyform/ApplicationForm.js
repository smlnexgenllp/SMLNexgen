"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./Applyform.module.css";

const ApplicationForm = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // State for role
  const router = useRouter();

  // Fetch user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    // console.log(storedUser);
  }, []);

  // Revoke file URL when component unmounts or fileURL changes
  useEffect(() => {
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  // Fetch job details to auto-fill the role field
  useEffect(() => {
    if (jobId) {
      fetch("https://sml-backend-qgp6.onrender.com/api/jobs")
        .then((res) => res.json())
        .then((data) => {
          const job = data.find((job) => job.id === parseInt(jobId));
          if (job) {
            setRole(job.title);
          }
        })
        .catch((error) => console.error("Error fetching job details:", error));
    }
  }, [jobId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      if (fileURL) URL.revokeObjectURL(fileURL);
      setSelectedFile(file);
      setFileURL(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileURL) URL.revokeObjectURL(fileURL);
    setFileURL(null);
    document.getElementById("resume").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      const response = await fetch(
        "https://sml-backend-qgp6.onrender.com/api/applications",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        alert("Application submitted successfully!");
        setSelectedFile(null);
        setFileURL(null);
        e.target.reset();
        router.push("/Careers/MyActivity");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.applicationForm}>
      <h2 className={styles.sectionHeader}>Apply Now</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="jobId" value={jobId || ""} />
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your Name"
              defaultValue={user ? user.fullName : ""}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="xyz@example.com"
              defaultValue={user ? user.email : ""}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+91 (923) 000-0000"
              defaultValue={user ? user.phone : ""}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="position">Role</label>
            <input
              type="text"
              id="position"
              name="position"
              required
              value={role}
              readOnly // Role field is now read-only
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="experience">Professional Experience</label>
          <textarea
            id="experience"
            name="experience"
            rows="4"
            required
            placeholder="Tell us about your relevant experience..."
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="resume">Resume/CV</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            required
            onChange={handleFileChange}
          />
        </div>
        {selectedFile && (
          <div className={styles.filePreview}>
            <p>
              <strong>Uploaded File:</strong>{" "}
              <a href={fileURL} target="_blank" rel="noopener noreferrer">
                {selectedFile.name}
              </a>
            </p>
            <div className={styles.fileActions}>
              <button
                type="button"
                className={styles.fileButton}
                onClick={() => window.open(fileURL, "_blank")}
              >
                Preview PDF
              </button>
              <button
                type="button"
                className={styles.fileButton}
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </section>
  );
};

export default ApplicationForm;

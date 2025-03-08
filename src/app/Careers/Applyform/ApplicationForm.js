"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Add this import
import styles from "./Applyform.module.css";

const ApplicationForm = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId"); // Get jobId from URL
  const jobTitle = searchParams.get("jobTitle"); // Add this line after jobId
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleanup file URL on component unmount
  useEffect(() => {
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      if (fileURL) URL.revokeObjectURL(fileURL); // Cleanup previous URL
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
    const fileInput = document.getElementById("resume");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      const response = await fetch("http://192.168.0.197:5000/api/applications", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Application submitted successfully!");
        // Optionally, reset the form or redirect
        setSelectedFile(null);
        setFileURL(null);
        e.target.reset();
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
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              required
              defaultValue={jobTitle || ""}
              placeholder="Select Position"
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
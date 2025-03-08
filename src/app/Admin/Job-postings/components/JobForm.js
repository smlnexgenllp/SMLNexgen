'use client';
import { useState } from "react";
import styles from "../job-postings.module.css";

export default function JobForm({ onAddJob }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salaryRange: "",
    jobType: "",
    requirements: "",
    deadline: "",
    contactEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["title", "description", "location", "jobType", "requirements", "deadline", "contactEmail"];
    const isValid = requiredFields.every((field) => formData[field].trim() !== "");
    if (isValid) {
      onAddJob(formData);
      setFormData({
        title: "",
        description: "",
        location: "",
        salaryRange: "",
        jobType: "",
        requirements: "",
        deadline: "",
        contactEmail: "",
      });
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Job Title*:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description*:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>Location*:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="salaryRange" className={styles.label}>Salary Range:</label>
          <input
            type="text"
            id="salaryRange"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., $50,000 - $70,000"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="jobType" className={styles.label}>Job Type*:</label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="requirements" className={styles.label}>Requirements*:</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="e.g., 3+ years experience, Bachelor’s degree"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="deadline" className={styles.label}>Application Deadline*:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactEmail" className={styles.label}>Contact Email*:</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
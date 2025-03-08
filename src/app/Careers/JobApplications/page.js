"use client";
// components/JobApplications.js
import React, { useState } from "react";
import styles from "./JobApplications.module.css"; // Using CSS Modules

const JobApplications = () => {
  const [filter, setFilter] = useState("");
  const [applications, setApplications] = useState([
    {
      id: "441481",
      title: "Technical Intern",
      location: "Bengaluru, Karnataka, India",
      date: "October 21, 2024",
      status: "Rejected",
    },
    {
      id: "435693",
      title: "Junior Automation Engineer",
      location: "Bengaluru, Karnataka, India",
      date: "September 16, 2024",
      status: "Rejected",
    },
    {
      id: "428463",
      title: "Trainee",
      location: "Bengaluru, Karnataka, India",
      date: "September 2, 2024",
      status: "Rejected",
    },
  ]);

  const handleRemove = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.title.toLowerCase().includes(filter.toLowerCase()) ||
      app.date.toLowerCase().includes(filter.toLowerCase()) ||
      app.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.job_app_container}>
      <div className={styles.job_app_header}>
        <h1>My Applications</h1>
      </div>
      <div className={styles.job_app_filter_section}>
        <input
          type="text"
          placeholder="Filter jobs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.job_app_filter_input}
        />
      </div>
      <div className={styles.job_app_table_container}>
        <table className={styles.job_app_table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Job Title</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr key={app.id}>
                <td>{index + 1}</td>
                <td>{app.title}</td>
                <td>{app.date}</td>
                <td>{app.status}</td>
                <td>
                  <button
                    onClick={() => handleRemove(app.id)}
                    className={styles.job_app_remove_button}
                  >
                    Withdrawal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.job_app_footer}>
          Showing {filteredApplications.length} Jobs ○
        </div>
      </div>
    </div>
  );
};

export default JobApplications;

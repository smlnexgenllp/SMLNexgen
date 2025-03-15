"use client";
import React, { useState, useEffect } from "react";
import styles from "./MyActivity.module.css";

const MyActivity = () => {
  const [filter, setFilter] = useState("");
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`https://sml-backend-qgp6.onrender.com/api/applications/user/${user.email}`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) => console.error("Error fetching applications:", error));
    }
  }, [user]);

  const handleWithdraw = async (id) => {
    try {
      const response = await fetch(
        `https://sml-backend-qgp6.onrender.com/api/applications/${id}/withdraw`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setApplications(
          applications.map((app) =>
            app.id === id ? { ...app, status: "Withdrawn" } : app
          )
        );
      } else {
        alert("Failed to withdraw application");
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
      alert("Error withdrawing application");
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.position.toLowerCase().includes(filter.toLowerCase()) ||
      app.createdAt.toLowerCase().includes(filter.toLowerCase()) ||
      app.status.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return styles.statusApplied;
      case "Withdrawn":
        return styles.statusWithdrawn;
      case "Under Review":
        return styles.statusUnderReview;
      case "Selected":
        return styles.statusSelected;
      case "Not Selected":
        return styles.statusNotSelected;
      default:
        return "";
    }
  };

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
                <td>{app.position}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.statusBox} ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleWithdraw(app.id)}
                    className={styles.job_app_remove_button}
                    disabled={app.status !== "Applied"}
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.job_app_footer}>
          Showing {filteredApplications.length} Jobs
        </div>
      </div>
    </div>
  );
};

export default MyActivity;

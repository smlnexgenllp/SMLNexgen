"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from "./applications.module.css";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all applications on mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications based on search query
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
          app.position.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
  }, [search, applications]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://192.168.0.197:5000/api/applications");
      const data = await response.json();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
        Back to Dashboard
      </Link>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by applicant or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <>
          {filteredApplications.length > 0 ? (
            <ul className={styles.applicationList}>
              {filteredApplications.map((app) => (
                <li key={app.id} className={styles.applicationItem}>
                  <div className={styles.cardHeader}>
                    <h2>{app.applicantName}</h2>
                    <span className={styles.badge}>{app.position}</span>
                  </div>
                  <p>
                    <strong>Job ID:</strong> {app.jobId}
                  </p>
                  <p>
                    <strong>Email:</strong> {app.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {app.phone}
                  </p>
                  <p className={styles.coverLetter}>
                    <strong>Cover Letter:</strong> {app.coverLetter}
                  </p>
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a
                      href={`http://192.168.0.197:5000/${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                  <p className={styles.submitted}>
                    <strong>Submitted:</strong>{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noApplications}>No applications found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminApplications;

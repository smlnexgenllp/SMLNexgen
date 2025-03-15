"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./applications.module.css";

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [search, applications, statusFilter, sortBy]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "https://sml-backend-qgp6.onrender.com/api/applications"
      );
      const data = await response.json();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    // Apply search filter
    if (search.trim() !== "") {
      filtered = filtered.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
          app.position.toLowerCase().includes(search.toLowerCase()) ||
          app.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "nameAZ") {
      filtered.sort((a, b) => a.applicantName.localeCompare(b.applicantName));
    } else if (sortBy === "nameZA") {
      filtered.sort((a, b) => b.applicantName.localeCompare(a.applicantName));
    }

    setFilteredApplications(filtered);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `https://sml-backend-qgp6.onrender.com/api/applications/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setApplications(
          applications.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
      } else {
        const errorData = await response.json();
        alert(
          `Failed to update status: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return styles.statusApplied;
      case "Under Review":
        return styles.statusReview;
      case "Selected":
        return styles.statusSelected;
      case "Not Selected":
        return styles.statusRejected;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Job Applications</h1>
        <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
          Back to Dashboard
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name, position, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterContainer}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Selected">Selected</option>
            <option value="Not Selected">Not Selected</option>
            <option value="Withdrawn">Withdrawn</option>

          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="nameAZ">Name (A-Z)</option>
            <option value="nameZA">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinnerBorder}></div>
          <span>Loading applications...</span>
        </div>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{applications.length}</span>
              <span className={styles.statLabel}>Total Applications</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {
                  applications.filter((app) => app.status === "Under Review")
                    .length
                }
              </span>
              <span className={styles.statLabel}>Under Review</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {applications.filter((app) => app.status === "Selected").length}
              </span>
              <span className={styles.statLabel}>Selected</span>
            </div>
          </div>

          {filteredApplications.length > 0 ? (
            <div className={styles.applicationGrid}>
              {filteredApplications.map((app) => (
                <div key={app.id} className={styles.applicationCard}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.applicantName}>
                      {app.applicantName}
                    </h2>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.positionDetails}>
                      <span className={styles.position}>{app.position}</span>
                      <span className={styles.jobId}>Job ID: {app.jobId}</span>
                    </div>

                    <div className={styles.contactInfo}>
                      <div className={styles.infoItem}>
                        <i className={styles.emailIcon}></i>
                        <span>{app.email}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <i className={styles.phoneIcon}></i>
                        <span>{app.phone}</span>
                      </div>
                    </div>

                    <div className={styles.coverLetterContainer}>
                      <h3 className={styles.sectionTitle}>Cover Letter</h3>
                      <p className={styles.coverLetter}>
                        {app.coverLetter.length > 150
                          ? `${app.coverLetter.substring(0, 150)}...`
                          : app.coverLetter}
                      </p>
                      {app.coverLetter.length > 150 && (
                        <button className={styles.expandButton}>
                          Read More
                        </button>
                      )}
                    </div>

                    <div className={styles.resumeLink}>
                      <a
                        href={`https://sml-backend-qgp6.onrender.com/${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewResumeButton}
                      >
                        View Resume
                      </a>
                    </div>

                    <div className={styles.appliedDate}>
                      Applied on{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <label
                      htmlFor={`status-${app.id}`}
                      className={styles.statusLabel}
                    >
                      Update Status:
                    </label>
                    <select
                      id={`status-${app.id}`}
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      className={styles.statusSelect}
                      disabled={app.status === "Withdrawn"}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Selected">Selected</option>
                      <option value="Not Selected">Not Selected</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noApplications}>
              <div className={styles.emptyState}>
                <i className={styles.searchIcon}></i>
                <p>No applications found matching your criteria.</p>
                {search || statusFilter !== "All" ? (
                  <button
                    className={styles.resetButton}
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                    }}
                  >
                    Reset Filters
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobApplicationsPage;

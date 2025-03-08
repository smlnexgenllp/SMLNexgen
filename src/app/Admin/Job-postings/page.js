'use client';
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import JobPostingsTable from "./components/JobPostingsTable";
import JobForm from "./components/JobForm";
import styles from "./job-postings.module.css";

export default function JobPostingsPage() {
  const [jobs, setJobs] = useState([]); // State to store all job data
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://192.168.0.197:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data); // Initialize filtered jobs with all jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleAddJob = async (newJob) => {
    try {
      const response = await fetch('http://192.168.0.197:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      const addedJob = await response.json();
      setJobs([...jobs, addedJob]);
      setFilteredJobs([...jobs, addedJob]); // Update filtered jobs
      setShowForm(false);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(term) || // Search by title
      job.location.toLowerCase().includes(term) || // Optionally search by location
      job.jobType.toLowerCase().includes(term) // Optionally search by job type
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Job Postings</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Link href="/Admin/Dashboard" className={styles.backButton} style={{ backgroundColor: "#dc3545", marginRight: "10px" }}>
            Back to Home
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.input} // Use the existing input style from job-postings.module.css
              style={{ width: "200px", padding: "8px" }}
            />
            <button
              onClick={() => setShowForm(!showForm)}
              className={styles.addButton}
            >
              {showForm ? "Cancel" : "Add Job"}
            </button>
          </div>
        </div>
        {showForm && <JobForm onAddJob={handleAddJob} />}
        <JobPostingsTable jobs={filteredJobs} onDeleteJob={deleteJob} onEditJob={editJob} />
      </div>
    </div>
  );

  async function deleteJob(id) {
    try {
      await fetch(`http://192.168.0.197:5000/api/jobs/${id}`, {
        method: 'DELETE',
      });
      setJobs(jobs.filter((_, index) => index !== parseInt(id)));
      setFilteredJobs(jobs.filter((_, index) => index !== parseInt(id))); // Update filtered jobs
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  }

  async function editJob(id, updatedJob) {
    try {
      const response = await fetch(`http://192.168.0.197:5000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
      const editedJob = await response.json();
      const updatedJobs = jobs.map((job, index) => (index === parseInt(id) ? editedJob : job));
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs); // Update filtered jobs
    } catch (error) {
      console.error('Error editing job:', error);
    }
  }
}
"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import styles from "./jobs.module.css";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    subtitle: "",
    logo: "",
    bgColor: "#2e2882", // Default color value
    details: {
      time: "",
      level: "",
      experience: "",
      salary: "",
      overview: "",
      description: [""],
    },
  });
  const [editingJobId, setEditingJobId] = useState(null);
  const [activeTab, setActiveTab] = useState("post");

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://192.168.0.197:5000/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("details.")) {
      const detailKey = name.split(".")[1];
      setNewJob({
        ...newJob,
        details: { ...newJob.details, [detailKey]: value },
      });
    } else if (name === "description") {
      const index = parseInt(e.target.dataset.index, 10);
      const updatedDescription = [...newJob.details.description];
      updatedDescription[index] = value;
      setNewJob({
        ...newJob,
        details: { ...newJob.details, description: updatedDescription },
      });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  // Special handler for color picker
  const handleColorChange = (e) => {
    setNewJob({ ...newJob, bgColor: e.target.value });
  };

  const addDescriptionField = () => {
    setNewJob({
      ...newJob,
      details: {
        ...newJob.details,
        description: [...newJob.details.description, ""],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a copy of newJob to ensure all data is properly structured
    const jobData = {
      ...newJob,
      logo: newJob.logo.trim(), // Ensure logo string is trimmed
      bgColor: newJob.bgColor.trim(), // Ensure color string is trimmed
    };
    
    try {
      const method = editingJobId ? "PUT" : "POST";
      const url = editingJobId
        ? `http://192.168.0.197:5000/api/jobs/${editingJobId}`
        : "http://192.168.0.197:5000/api/jobs";
        
      // Log the data being sent to help with debugging
      console.log("Sending job data:", jobData);
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      
      if (response.ok) {
        alert(editingJobId ? "Job updated successfully!" : "Job posted successfully!");
        fetchJobs();
        setNewJob({
          title: "",
          subtitle: "",
          logo: "",
          bgColor: "#2e2882", // Reset to default color
          details: { time: "", level: "", experience: "", salary: "", overview: "", description: [""] },
        });
        setEditingJobId(null);
        setActiveTab("manage");
      } else {
        // Get more detailed error information
        const errorText = await response.text();
        console.error("Server response:", errorText);
        alert(`Failed to save job. Server response: ${errorText}`);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert(`Error saving job: ${error.message}`);
    }
  };

  const handleEdit = (job) => {
    // Create a deep copy of the job to ensure we're not missing any properties
    const jobToEdit = {
      ...job,
      details: { ...job.details }
    };
    
    // Ensure description is an array
    if (!Array.isArray(jobToEdit.details.description)) {
      jobToEdit.details.description = jobToEdit.details.description 
        ? [jobToEdit.details.description] 
        : [""];
    }
    
    setNewJob(jobToEdit);
    setEditingJobId(job.id);
    setActiveTab("post");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    try {
      const response = await fetch(`http://192.168.0.197:5000/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Job deleted successfully!");
        fetchJobs();
      } else {
        const errorText = await response.text();
        alert(`Failed to delete job. Server response: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert(`Error deleting job: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
        Back to Dashboard
      </Link>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "post" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("post")}
        >
          {editingJobId ? "Edit Job" : "Post Job"}
        </button>
        <button
          className={`${styles.tab} ${activeTab === "manage" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Jobs
        </button>
      </div>
      {activeTab === "post" && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              name="title"
              value={newJob.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              name="subtitle"
              value={newJob.subtitle}
              onChange={handleChange}
              placeholder="Job Subtitle"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <select
              className={styles.input}
              name="logo"
              value={newJob.logo}
              onChange={handleChange}
              required
            >
              <option value="">Select an Icon</option>
              <optgroup label="Software Development & Engineering">
                <option value="fa6-solid:code">Software Engineer / Developer</option>
                <option value="material-symbols:laptop-code">Full Stack Developer</option>
                <option value="fa6-solid:desktop">Frontend Developer</option>
                <option value="fa6-solid:server">Backend Developer</option>
                <option value="fa6-solid:mobile-alt">Mobile App Developer</option>
                <option value="fa6-solid:cogs">DevOps Engineer</option>
                <option value="fa6-solid:cloud">Cloud Engineer</option>
                <option value="fa6-solid:database">Data Engineer</option>
                <option value="fa6-solid:microchip">Embedded Systems Engineer</option>
              </optgroup>
              <optgroup label="IT Infrastructure & Security">
                <option value="material-symbols:settings">System Administrator</option>
                <option value="bi:network-wired">Network Engineer</option>
                <option value="fa6-solid:database">Database Administrator (DBA)</option>
                <option value="fa6-solid:shield-alt">Cybersecurity Analyst</option>
                <option value="fa6-solid:headset">IT Support / Help Desk</option>
                <option value="fa6-solid:cloud-lock">Cloud Security Engineer</option>
                <option value="fa6-solid:exclamation-triangle">Incident Response Analyst</option>
              </optgroup>
              <optgroup label="Data Science & Analytics">
                <option value="fa6-solid:chart-line">Data Scientist</option>
                <option value="fa6-solid:robot">Machine Learning Engineer</option>
                <option value="bi:graph-up">Data Analyst</option>
                <option value="fa6-solid:database">Big Data Engineer</option>
                <option value="fa6-solid:brain">AI Researcher</option>
              </optgroup>
              <optgroup label="Product & Project Management">
                <option value="material-symbols:business">Product Manager (PM)</option>
                <option value="fa6-solid:project-diagram">Project Manager</option>
                <option value="fa6-solid:users">Scrum Master</option>
                <option value="fa6-solid:chart-pie">Business Analyst</option>
              </optgroup>
              <optgroup label="Quality Assurance & Testing">
                <option value="fa6-solid:check-circle">QA Engineer</option>
                <option value="fa6-solid:cogs">Automation Tester</option>
                <option value="fa6-solid:hand-pointer">Manual Tester</option>
              </optgroup>
              <optgroup label="UI/UX & Design">
                <option value="material-symbols:design-services">UI/UX Designer</option>
                <option value="fa6-solid:paint-brush">Graphic Designer</option>
                <option value="fa6-solid:film">Motion Designer</option>
              </optgroup>
              <optgroup label="Sales, Marketing & Customer Success">
                <option value="fa6-solid:bullhorn">Technical Sales Engineer</option>
                <option value="material-symbols:trending-up">Business Development Manager</option>
                <option value="material-symbols:campaign">Digital Marketing Specialist</option>
                <option value="bi:emoji-smile">Customer Success Manager</option>
              </optgroup>
              <optgroup label="Human Resources & Administration">
                <option value="fa6-solid:user-tie">HR Manager</option>
                <option value="material-symbols:person-search">Recruiter / Talent Acquisition</option>
                <option value="bi:building">Office Manager</option>
              </optgroup>
              <optgroup label="Executive & Leadership Roles">
                <option value="material-symbols:leaderboard">Chief Executive Officer (CEO)</option>
                <option value="fa6-solid:microchip">Chief Technology Officer (CTO)</option>
                <option value="bi:network-wired">Chief Information Officer (CIO)</option>
                <option value="material-symbols:inventory">Chief Product Officer (CPO)</option>
                <option value="fa6-solid:shield-alt">Chief Security Officer (CSO)</option>
                <option value="fa6-solid:database">Chief Data Officer (CDO)</option>
              </optgroup>
              <optgroup label="Emerging & Specialized Roles">
                <option value="fa6-solid:link">Blockchain Developer</option>
                <option value="fa6-solid:vr-cardboard">AR/VR Developer</option>
                <option value="fa6-solid:atom">Quantum Computing Engineer</option>
              </optgroup>
              <optgroup label="IT Consulting & Operations">
                <option value="fa6-solid:comments">IT Consultant</option>
                <option value="fa6-solid:briefcase">Business Consultant</option>
                <option value="fa6-solid:lightbulb">Strategy Consultant</option>
                <option value="fa6-solid:tools">IT Operations Manager</option>
                <option value="fa6-solid:file-alt">Technical Writer</option>
                <option value="fa6-solid:headset">Customer Support Specialist</option>
                <option value="fa6-solid:sync-alt">Digital Transformation Manager</option>
                <option value="fa6-solid:rocket">Innovation Manager</option>
              </optgroup>
            </select>
            <div className={styles.iconPreview}>
              <span>Preview: </span>
              {newJob.logo && (
                <Icon
                  icon={newJob.logo}
                  width={48}
                  height={48}
                  style={{ color: newJob.bgColor || "#000" }}
                />
              )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="colorPicker" className={styles.colorLabel}>
              Background Color:
            </label>
            <div className={styles.colorPickerContainer}>
              <input
                type="color"
                id="colorPicker"
                name="bgColor"
                value={newJob.bgColor}
                onChange={handleColorChange}
                className={styles.colorPicker}
              />
              <span className={styles.colorCode}>{newJob.bgColor}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              name="details.time"
              value={newJob.details.time}
              onChange={handleChange}
              placeholder="Time (e.g., Full Time)"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              name="details.level"
              value={newJob.details.level}
              onChange={handleChange}
              placeholder="Level (e.g., Senior Level)"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              name="details.experience"
              value={newJob.details.experience}
              onChange={handleChange}
              placeholder="Experience (e.g., Min. 1 Year)"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              name="details.salary"
              value={newJob.details.salary}
              onChange={handleChange}
              placeholder="Salary (e.g., $2150.0 / Month)"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              name="details.overview"
              value={newJob.details.overview}
              onChange={handleChange}
              placeholder="Job Overview"
              required
            />
          </div>
          {newJob.details.description.map((desc, index) => (
            <div className={styles.formGroup} key={index}>
              <input
                className={styles.input}
                name="description"
                data-index={index}
                value={desc}
                onChange={handleChange}
                placeholder={`Description Item ${index + 1}`}
                required
              />
            </div>
          ))}
          <div className={styles.formGroup}>
            <button type="button" onClick={addDescriptionField} className={styles.addButton}>
              Add Description Item
            </button>
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitButton}>
              {editingJobId ? "Update Job" : "Post Job"}
            </button>
            {editingJobId && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setEditingJobId(null);
                  setNewJob({
                    title: "",
                    subtitle: "",
                    logo: "",
                    bgColor: "#2e2882",
                    details: { time: "", level: "", experience: "", salary: "", overview: "", description: [""] },
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}
      {activeTab === "manage" && (
        <div className={styles.manageSection}>
          <h2>Current Jobs</h2>
          <ul className={styles.jobList}>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <li key={job.id} className={styles.jobItem}>
                  <div className={styles.jobInfo}>
                    {job.logo && (
                      <Icon
                        icon={job.logo}
                        width={24}
                        height={24}
                        style={{ 
                          color: job.bgColor || "#000",
                          marginRight: "10px"
                        }}
                      />
                    )}
                    <span className={styles.jobTitle}>{job.title}</span>
                    <span className={styles.jobSubtitle}>{job.subtitle}</span>
                  </div>
                  <div className={styles.jobActions}>
                    <button className={styles.editButton} onClick={() => handleEdit(job)}>
                      Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(job.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No jobs found. Add a new job to get started.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
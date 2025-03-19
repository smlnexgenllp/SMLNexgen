// Admin/JobPostings/page.js

"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./jobpostings.module.css";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newJob, setNewJob] = useState({
    title: "",
    subtitle: "",
    logo: "",
    bgColor: "#0162FF",
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
  const [activeTab, setActiveTab] = useState("manage");
  const [showIconGrid, setShowIconGrid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const router = useRouter();

  // Expanded icon collection without categories
  const allIcons = [
    // Software Development & Engineering
    { value: "fa6-solid:code", label: "Software Engineer" },
    { value: "fa6-solid:server", label: "Backend Developer" },
    { value: "fa6-solid:cloud", label: "Cloud Engineer" },
    { value: "fa6-solid:database", label: "Data Engineer" },
    { value: "fa6-solid:microchip", label: "Embedded Systems" },
    { value: "fa6-solid:mobile", label: "Mobile Developer" },
    { value: "fa6-solid:laptop-code", label: "Frontend Developer" },
    { value: "fa6-solid:sitemap", label: "DevOps Engineer" },
    { value: "fa6-solid:bug", label: "QA Engineer" },

    // IT Infrastructure & Security
    { value: "material-symbols:settings", label: "System Admin" },
    { value: "fa6-solid:headset", label: "IT Support" },
    { value: "fa6-solid:network-wired", label: "Network Engineer" },
    { value: "fa6-solid:lock", label: "Security Analyst" },
    { value: "fa6-solid:shield", label: "Cybersecurity" },
    { value: "fa6-solid:desktop", label: "Desktop Support" },
    { value: "fa6-solid:virus", label: "Malware Analyst" },

    // Data Science & Analytics
    { value: "fa6-solid:chart-line", label: "Data Scientist" },
    { value: "fa6-solid:robot", label: "ML Engineer" },
    { value: "fa6-solid:brain", label: "AI Researcher" },
    { value: "fa6-solid:magnifying-glass-chart", label: "Data Analyst" },
    { value: "fa6-solid:chart-bar", label: "Business Intelligence" },
    { value: "fa6-solid:database", label: "Database Admin" },
    { value: "fa6-solid:coins", label: "Financial Analyst" },

    // Product & Project Management
    { value: "fa6-solid:users", label: "Scrum Master" },
    { value: "fa6-solid:chart-pie", label: "Business Analyst" },
    { value: "fa6-solid:clipboard-list", label: "Project Manager" },
    { value: "fa6-solid:bullseye", label: "Product Manager" },
    { value: "fa6-solid:puzzle-piece", label: "Product Owner" },
    { value: "fa6-solid:people-group", label: "Team Lead" },

    // Quality Assurance & Testing
    { value: "fa6-solid:hand-pointer", label: "Manual Tester" },
    { value: "fa6-solid:vial", label: "Test Engineer" },
    { value: "fa6-solid:microscope", label: "QA Analyst" },
    { value: "fa6-solid:list-check", label: "Quality Assurance" },
    { value: "fa6-solid:flask", label: "Test Automation" },

    // UI/UX & Design
    { value: "material-symbols:design-services", label: "UI/UX Designer" },
    { value: "fa6-solid:film", label: "Motion Designer" },
    { value: "fa6-solid:palette", label: "Graphic Designer" },
    { value: "fa6-solid:pen-nib", label: "Illustrator" },
    { value: "fa6-solid:compass-drafting", label: "Product Designer" },
    { value: "fa6-solid:wand-magic-sparkles", label: "Creative Designer" },

    // Sales, Marketing & Customer Success
    { value: "fa6-solid:bullhorn", label: "Tech Sales" },
    { value: "material-symbols:trending-up", label: "Business Dev" },
    { value: "material-symbols:campaign", label: "Marketing" },
    { value: "bi:emoji-smile", label: "Customer Success" },
    { value: "fa6-solid:coins", label: "Sales Rep" },
    { value: "fa6-solid:handshake", label: "Account Manager" },
    { value: "fa6-solid:comments-dollar", label: "Sales Manager" },

    // Human Resources & Administration
    { value: "fa6-solid:user-tie", label: "HR Manager" },
    { value: "material-symbols:person-search", label: "Recruiter" },
    { value: "bi:building", label: "Office Manager" },
    { value: "fa6-solid:user-group", label: "Talent Acquisition" },
    { value: "fa6-solid:graduation-cap", label: "Training Specialist" },
    { value: "fa6-solid:scale-balanced", label: "Compliance Officer" },
    { value: "fa6-solid:briefcase", label: "HR Specialist" },

    // Executive & Leadership Roles
    { value: "material-symbols:leaderboard", label: "CEO" },
    { value: "material-symbols:inventory", label: "CPO" },
    { value: "fa6-solid:money-bill-trend-up", label: "CFO" },
    { value: "fa6-solid:gears", label: "CTO" },
    { value: "fa6-solid:bullhorn", label: "CMO" },
    { value: "fa6-solid:sitemap", label: "CIO" },
    { value: "fa6-solid:user-shield", label: "CISO" },

    // Emerging & Specialized Roles
    { value: "fa6-solid:link", label: "Blockchain Dev" },
    { value: "fa6-solid:vr-cardboard", label: "AR/VR Dev" },
    { value: "fa6-solid:atom", label: "Quantum Engineer" },
    { value: "fa6-solid:robot", label: "Robotics Engineer" },
    { value: "fa6-solid:microchip", label: "IoT Developer" },
    { value: "fa6-solid:brain", label: "Cognitive Scientist" },
    { value: "fa6-solid:globe", label: "Web3 Developer" },

    // IT Consulting & Operations
    { value: "fa6-solid:comments", label: "IT Consultant" },
    { value: "fa6-solid:briefcase", label: "Business Consultant" },
    { value: "fa6-solid:lightbulb", label: "Strategy Consultant" },
    { value: "fa6-solid:rocket", label: "Innovation Manager" },
    { value: "fa6-solid:handshake", label: "Partnership Manager" },
    { value: "fa6-solid:chart-line", label: "Operations Manager" },
    { value: "fa6-solid:check-double", label: "Quality Assurance" },
    { value: "fa6-solid:clipboard-check", label: "Compliance Manager" },

    // Additional Miscellaneous Icons
    { value: "fa6-solid:camera", label: "Photographer" },
    { value: "fa6-solid:video", label: "Videographer" },
    { value: "fa6-solid:music", label: "Audio Engineer" },
    { value: "fa6-solid:pen", label: "Content Writer" },
    { value: "fa6-solid:language", label: "Translator" },
    { value: "fa6-solid:book", label: "Technical Writer" },
    { value: "fa6-solid:truck", label: "Logistics" },
    { value: "fa6-solid:hammer", label: "Construction" },
    { value: "fa6-solid:leaf", label: "Environmental" },
    { value: "fa6-solid:stethoscope", label: "Healthcare" },
    { value: "fa6-solid:graduation-cap", label: "Education" },
    { value: "fa6-solid:gavel", label: "Legal" },
    { value: "fa6-solid:utensils", label: "Food Service" },
    { value: "fa6-solid:cart-shopping", label: "Retail" },
  ];

  // Fetch jobs on mount
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/Admin"); // Redirect to login if no token
      return;
    }
    fetchJobs();
  }, [router]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://192.168.0.197:5000/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showNotification("Failed to load jobs. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
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

  const removeDescriptionField = (index) => {
    if (newJob.details.description.length > 1) {
      const updatedDescription = [...newJob.details.description];
      updatedDescription.splice(index, 1);
      setNewJob({
        ...newJob,
        details: { ...newJob.details, description: updatedDescription },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!newJob.title || !newJob.subtitle || !newJob.logo) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    // Create a copy of newJob to ensure all data is properly structured
    const jobData = {
      ...newJob,
      logo: newJob.logo.trim(),
      bgColor: newJob.bgColor.trim(),
    };

    try {
      const method = editingJobId ? "PUT" : "POST";
      const url = editingJobId
        ? `http://192.168.0.197:5000/api/jobs/${editingJobId}`
        : "http://192.168.0.197:5000/api/jobs";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        showNotification(
          editingJobId ? "Job updated successfully!" : "Job posted successfully!",
          "success"
        );
        fetchJobs();
        resetForm();
        setActiveTab("manage");
      } else {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        showNotification(`Failed to save job: ${errorText}`, "error");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      showNotification(`Error saving job: ${error.message}`, "error");
    }
  };

  const resetForm = () => {
    setNewJob({
      title: "",
      subtitle: "",
      logo: "",
      bgColor: "#0162FF",
      details: {
        time: "",
        level: "",
        experience: "",
        salary: "",
        overview: "",
        description: [""]
      },
    });
    setEditingJobId(null);
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
        showNotification("Job deleted successfully!", "success");
        fetchJobs();
      } else {
        const errorText = await response.text();
        showNotification(`Failed to delete job: ${errorText}`, "error");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      showNotification(`Error deleting job: ${error.message}`, "error");
    }
  };

  const toggleIconGrid = () => {
    setShowIconGrid(!showIconGrid);
    // Reset search when toggling
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const selectIcon = (iconValue) => {
    setNewJob({ ...newJob, logo: iconValue });
    setShowIconGrid(false);
  };

  // Filter icons based on search query
  const filteredIcons = searchQuery
    ? allIcons.filter(
      icon =>
        icon.label.toLowerCase().includes(searchQuery) ||
        icon.value.toLowerCase().includes(searchQuery)
    )
    : allIcons;

  return (
    <div className={styles.adminContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Job Postings Administration</h1>
          <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Notification */}
      {notification.show && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Navigation Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "manage" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            <Icon icon="material-symbols:format-list-bulleted" width={20} height={20} />
            Manage Jobs
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "post" ? styles.activeTab : ""}`}
            onClick={() => {
              setActiveTab("post");
              if (editingJobId) resetForm();
            }}
          >
            <Icon icon="material-symbols:add-circle-outline" width={20} height={20} />
            {editingJobId ? "Edit Job" : "Create New Job"}
          </button>
        </div>

        {/* Job Form Section */}
        {activeTab === "post" && (
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2>{editingJobId ? "Edit Job Posting" : "Create New Job Posting"}</h2>
              {editingJobId && (
                <button
                  className={styles.cancelEditButton}
                  onClick={resetForm}
                >
                  <Icon icon="material-symbols:close" width={16} height={16} />
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className={styles.jobForm}>
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Basic Information</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="jobTitle">Job Title *</label>
                    <input
                      id="jobTitle"
                      className={styles.input}
                      name="title"
                      value={newJob.title}
                      onChange={handleChange}
                      placeholder="e.g. Senior Software Engineer"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="jobSubtitle">Job Subtitle *</label>
                    <input
                      id="jobSubtitle"
                      className={styles.input}
                      name="subtitle"
                      value={newJob.subtitle}
                      onChange={handleChange}
                      placeholder="e.g. Backend Development Team"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Job Icon *</label>
                    <div className={styles.iconSelectionContainer}>
                      {newJob.logo ? (
                        <div className={styles.selectedIcon}>
                          <Icon
                            icon={newJob.logo}
                            width={32}
                            height={32}
                            style={{ color: newJob.bgColor }}
                          />
                          <span>{allIcons.find(icon => icon.value === newJob.logo)?.label || newJob.logo}</span>
                        </div>
                      ) : (
                        <div className={styles.noIconSelected}>
                          <Icon icon="material-symbols:image-not-supported-outline" width={24} height={24} />
                          <span>No icon selected</span>
                        </div>
                      )}
                      <button
                        type="button"
                        className={styles.iconButton}
                        onClick={toggleIconGrid}
                      >
                        {showIconGrid ? 'Close' : 'Choose Icon'}
                      </button>
                    </div>

                    {showIconGrid && (
                      <div className={styles.iconPickerModal}>
                        <div className={styles.iconPickerHeader}>
                          <h4>Select Job Icon</h4>
                          <div className={styles.iconSearch}>
                            <Icon icon="material-symbols:search" width={20} height={20} />
                            <input
                              type="text"
                              placeholder="Search icons..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                            />
                          </div>
                        </div>
                        <div className={styles.iconGrid}>
                          {filteredIcons.map(icon => (
                            <div
                              key={icon.value}
                              className={`${styles.iconGridItem} ${newJob.logo === icon.value ? styles.selectedIconItem : ''}`}
                              onClick={() => selectIcon(icon.value)}
                              title={icon.label}
                            >
                              <Icon
                                icon={icon.value}
                                width={24}
                                height={24}
                                style={{ color: newJob.bgColor }}
                              />
                              <span>{icon.label}</span>
                            </div>
                          ))}
                          {filteredIcons.length === 0 && (
                            <div className={styles.noResults}>
                              No icons found matching &quot;{searchQuery}&quot;
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="colorPicker">Brand Color</label>
                    <div className={styles.colorPickerWrapper}>
                      <input
                        type="color"
                        id="colorPicker"
                        name="bgColor"
                        value={newJob.bgColor}
                        onChange={handleColorChange}
                        className={styles.colorPicker}
                      />
                      <span className={styles.colorHex}>{newJob.bgColor}</span>
                      <div className={styles.colorPreview} style={{ backgroundColor: newJob.bgColor }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Job Details</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="jobTime">Employment Type *</label>
                    <input
                      id="jobTime"
                      className={styles.input}
                      name="details.time"
                      value={newJob.details.time}
                      onChange={handleChange}
                      placeholder="e.g. Full Time, Contract"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="jobLevel">Position Level *</label>
                    <input
                      id="jobLevel"
                      className={styles.input}
                      name="details.level"
                      value={newJob.details.level}
                      onChange={handleChange}
                      placeholder="e.g. Senior, Mid-Level"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="jobExperience">Required Experience *</label>
                    <input
                      id="jobExperience"
                      className={styles.input}
                      name="details.experience"
                      value={newJob.details.experience}
                      onChange={handleChange}
                      placeholder="e.g. Min. 3 Years"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="jobSalary">Compensation Range *</label>
                    <input
                      id="jobSalary"
                      className={styles.input}
                      name="details.salary"
                      value={newJob.details.salary}
                      onChange={handleChange}
                      placeholder="e.g. $80,000 - $95,000/Year"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="jobOverview">Job Overview *</label>
                  <textarea
                    id="jobOverview"
                    className={styles.textarea}
                    name="details.overview"
                    value={newJob.details.overview}
                    onChange={handleChange}
                    placeholder="Provide a brief overview of the position and responsibilities"
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.sectionTitleRow}>
                  <h3 className={styles.sectionTitle}>Job Description Items</h3>
                  <button
                    type="button"
                    onClick={addDescriptionField}
                    className={styles.addItemButton}
                  >
                    <Icon icon="material-symbols:add-circle-outline" width={18} height={18} />
                    Add Item
                  </button>
                </div>

                {newJob.details.description.map((desc, index) => (
                  <div className={styles.descriptionItem} key={index}>
                    <input
                      className={styles.input}
                      name="description"
                      data-index={index}
                      value={desc}
                      onChange={handleChange}
                      placeholder={`Job requirement or responsibility #${index + 1}`}
                      required
                    />
                    {newJob.details.description.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeItemButton}
                        onClick={() => removeDescriptionField(index)}
                      >
                        <Icon icon="material-symbols:remove-circle-outline" width={18} height={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    resetForm();
                    setActiveTab("manage");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  {editingJobId ? "Update Job" : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List Section */}
        {activeTab === "manage" && (
          <div className={styles.jobsListContainer}>
            <div className={styles.jobsListHeader}>
              <h2>Current Job Postings</h2>
              <button
                className={styles.createJobButton}
                onClick={() => {
                  resetForm();
                  setActiveTab("post");
                }}
              >
                <Icon icon="material-symbols:add" width={20} height={20} />
                Create New Job
              </button>
            </div>

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading job listings...</p>
              </div>
            ) : jobs.length > 0 ? (
              <div className={styles.jobsTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableHeaderCell} style={{ width: '50%' }}>Job Title</div>
                  <div className={styles.tableHeaderCell} style={{ width: '25%' }}>Type</div>
                  <div className={styles.tableHeaderCell} style={{ width: '25%' }}>Actions</div>
                </div>

                {jobs.map((job) => (
                  <div key={job.id} className={styles.tableRow}>
                    <div className={styles.jobTitleCell}>
                      <div className={styles.jobIconContainer} style={{ backgroundColor: job.bgColor }}>
                        {job.logo && (
                          <Icon
                            icon={job.logo}
                            width={20}
                            height={20}
                            style={{ color: '#ffffff' }}
                          />
                        )}
                      </div>
                      <div className={styles.jobTitleInfo}>
                        <h3>{job.title}</h3>
                        <p>{job.subtitle}</p>
                      </div>
                    </div>
                    <div className={styles.jobTypeCell}>
                      {job.details.time}
                    </div>
                    <div className={styles.actionsCell}>
                      <button
                        className={styles.editJobButton}
                        onClick={() => handleEdit(job)}
                      >
                        <Icon icon="material-symbols:edit" width={18} height={18} />
                        Edit
                      </button>
                      <button
                        className={styles.deleteJobButton}
                        onClick={() => handleDelete(job.id)}
                      >
                        <Icon icon="material-symbols:delete" width={18} height={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Icon icon="material-symbols:work-outline" width={64} height={64} />
                <h3>No job postings yet</h3>
                <p>Create your first job posting to get started</p>
                <button
                  className={styles.createFirstJobButton}
                  onClick={() => setActiveTab("post")}
                >
                  Create First Job
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;

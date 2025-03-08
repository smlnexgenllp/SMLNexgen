'use client';
import { useState } from "react";
import styles from "../job-postings.module.css";

export default function JobPostingsTable({ jobs, onDeleteJob, onEditJob }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (id, job) => {
    setEditingId(id);
    setEditForm(job);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    onEditJob(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Salary Range</th>
            <th>Job Type</th>
            <th>Requirements</th>
            <th>Deadline</th>
            <th>Contact Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="9" className={styles.noJobs}>
                No job postings available.
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={index}>
                {editingId === index ? (
                  <td colSpan="9">
                    <form onSubmit={(e) => handleEditSubmit(e, index)}>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title || job.title}
                        onChange={handleEditChange}
                        className={styles.input}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editForm.description || job.description}
                        onChange={handleEditChange}
                        className={styles.input}
                      />
                      <input
                        type="text"
                        name="location"
                        value={editForm.location || job.location}
                        onChange={handleEditChange}
                        className={styles.input}
                      />
                      <input
                        type="text"
                        name="salaryRange"
                        value={editForm.salaryRange || job.salaryRange}
                        onChange={handleEditChange}
                        className={styles.input}
                      />
                      <select
                        name="jobType"
                        value={editForm.jobType || job.jobType}
                        onChange={handleEditChange}
                        className={styles.select}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                      <textarea
                        name="requirements"
                        value={editForm.requirements || job.requirements}
                        onChange={handleEditChange}
                        className={styles.textarea}
                      />
                      <input
                        type="date"
                        name="deadline"
                        value={editForm.deadline || job.deadline}
                        onChange={handleEditChange}
                        className={styles.input}
                      />
                      <input
                        type="email"
                        name="contactEmail"
                        value={editForm.contactEmail || job.contactEmail}
                        onChange={handleEditChange}
                        className={styles.input}
                      />
                      <button type="submit" className={styles.submitButton}>
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className={styles.addButton}
                        style={{ marginLeft: "10px" }}
                      >
                        Cancel
                      </button>
                    </form>
                  </td>
                ) : (
                  <>
                    <td>{job.title}</td>
                    <td>{job.description}</td>
                    <td>{job.location}</td>
                    <td>{job.salaryRange}</td>
                    <td>{job.jobType}</td>
                    <td>{job.requirements}</td>
                    <td>{job.deadline}</td>
                    <td>{job.contactEmail}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(index, job)}
                        className={styles.addButton}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteJob(index)}
                        className={styles.submitButton}
                        style={{ backgroundColor: "#dc3545" }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
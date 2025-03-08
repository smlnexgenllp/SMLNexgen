"use client"; // Ensure this is a client component in Next.js
import { useState } from "react";
import styles from "./AppointmentForm.module.css"; // Assuming this exists

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    date: "",
    selectedService: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?[0-9]{10,13}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number (10-13 digits).";
    }
    if (!formData.date.trim()) newErrors.date = "Date and time are required.";
    if (!formData.selectedService) newErrors.selectedService = "Please select a service.";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Get current time in IST
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30 in milliseconds
      const istTime = new Date(now.getTime() + istOffset);
      
      // Format the date and time as "YYYY-MM-DD HH:MM:SS"
      const submissionDate = istTime.toISOString().slice(0, 19).replace("T", " "); // e.g., "2025-03-05 11:55:00"

      // Create a new object with formData and the submission date
      const dataToSubmit = {
        ...formData,
        submissionDate,
      };
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://192.168.0.197:5000'; // Replace with your backend IP
        const response = await fetch(`${backendUrl}/api/book-service`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        });

        const responseData = await response.json();
        if (response.ok) {
          alert('Appointment booked successfully!');
          setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            date: "",
            reason: "",
            selectedService: "",
          });
          setErrors({});
        } else {
          alert(`Error submitting appointment: ${responseData.message}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Error submitting appointment. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.appointmentFormContainer}>
      <div className={styles.formTitle}>Book Your Appointment</div>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName" // Changed to name for consistency
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className={styles.errorMessage}>{errors.fullName}</p>}
        </label>
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="^\+?[0-9]{10,13}$"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber}</p>}
        </label>
        <label>
          Preferred Date/Time:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <p className={styles.errorMessage}>{errors.date}</p>}
        </label>
        <label>
          Select Service:
          <select
            name="selectedService"
            value={formData.selectedService}
            onChange={handleChange}
            required
          >
            <option value="">Select a Service</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Custom Software">Custom Software</option>
            <option value="IT Support">IT Support</option>
          </select>
          {errors.selectedService && <p className={styles.errorMessage}>{errors.selectedService}</p>}
        </label>
        <label>
          Reason for Appointment:
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
          {errors.reason && <p className={styles.errorMessage}>{errors.reason}</p>}
        </label>
        <button type="submit">Submit Appointment</button>
      </form>
      <div className={styles.formFooter}>
        By submitting, you agree to our terms and conditions.
      </div>
    </div>
  );
};

export default AppointmentForm;
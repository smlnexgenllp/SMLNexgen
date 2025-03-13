"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./BookMyService.module.css";

export default function BookMyService({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    date: "",
    selectedService: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef(null); // Reference to modalContent
  const modalRef = useRef(null); // Reference to modalContainer for glow effect

  // Open modal with delay
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

  // Glow effect logic
  useEffect(() => {
    const syncPointer = ({ clientX, clientY }) => {
      if (!modalRef.current) return;
      const rect = modalRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const xp = (x / rect.width).toFixed(2);
      const yp = (y / rect.height).toFixed(2);

      modalRef.current.style.setProperty("--x", x);
      modalRef.current.style.setProperty("--y", y);
      modalRef.current.style.setProperty("--xp", xp);
      modalRef.current.style.setProperty("--yp", yp);
    };

    document.addEventListener("pointermove", syncPointer);
    return () => {
      document.removeEventListener("pointermove", syncPointer);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.selectedService) newErrors.selectedService = "Please select a service";
    if (!formData.reason) newErrors.reason = "Reason is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://192.168.0.197:5000';
      const response = await fetch(`${backendUrl}/api/book-service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          date: "",
          selectedService: "",
          reason: "",
        });
        setErrors({});
        handleClose();
      } else {
        alert(`Error submitting appointment: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error submitting appointment. Please try again later.");
    }
  };
  

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (onClose) onClose();
    }, 500);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const cornerThreshold = 100;
    let translateX = 0;
    let translateY = 0;
    const maxMove = 10;

    if (mouseX < cornerThreshold && mouseY < cornerThreshold) {
      translateX = maxMove;
      translateY = maxMove;
    } else if (mouseX > width - cornerThreshold && mouseY < cornerThreshold) {
      translateX = -maxMove;
      translateY = maxMove;
    } else if (mouseX < cornerThreshold && mouseY > height - cornerThreshold) {
      translateX = maxMove;
      translateY = -maxMove;
    } else if (mouseX > width - cornerThreshold && mouseY > height - cornerThreshold) {
      translateX = -maxMove;
      translateY = -maxMove;
    }

    container.style.transform = `translate(${translateX}px, ${translateY}px)`;
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    (isOpen || isClosing) && (
      <div
        ref={modalRef}
        className={`${styles.modalContainer} ${isClosing ? styles.closing : ""}`}
        onClick={handleClose}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-glow
      >
        <div
          ref={containerRef}
          className={`${styles.modalContent} ${isClosing ? styles.closing : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.closeButton} onClick={handleClose}>×</span>
          <div className={styles.formTitle}>Book Your Appointment</div>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className={styles.inputField}
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
                placeholder="Enter your email address"
                required
                className={styles.inputField}
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
                pattern="^\+?[0-9]{10,14}$"
                placeholder="Enter your phone number"
                className={styles.inputField}
              />
              {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber}</p>}
            </label>
            <label>
              Preferred Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={styles.inputField}
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
                className={styles.selectField}
              >
                <option value="">Select a Service</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Software Development">Software Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Business Automation">Business Automation</option>
                <option value="Business Solutions">Business Solutions</option>
                <option value="Other Services">Other Services</option>
              </select>
              {errors.selectedService && <p className={styles.errorMessage}>{errors.selectedService}</p>}
            </label>
            <label>
              Reason for Appointment:
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter the reason for your appointment"
                required
                className={styles.textAreaField}
              />
              {errors.reason && <p className={styles.errorMessage}>{errors.reason}</p>}
            </label>
            <button type="submit" className={styles.submitButton}>Submit Appointment</button>
          </form>
          <div className={styles.formFooter}>By submitting, you agree to our terms and conditions.</div>
        </div>
      </div>
    )
  );
}
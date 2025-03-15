"use client";
import { useEffect, useState } from "react";
import { FaUser, FaComment } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import styles from "@/styles/contact.module.css";
import MontoyaText from "@/components/PortfolioTitleAnimation";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    
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
        const response = await fetch('https://sml-backend-qgp6.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        });

        if (response.ok) {
          alert('Form submitted successfully!');
          handleReset();
        } else {
          const errorData = await response.json();
          alert(`Error submitting form: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again later.');
      }
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <>
      {/* <div className={styles.montoyaTextWrapper}>
        <MontoyaText title="REACH US" />
      </div> */}
      <div id="contact" className={styles.contactPage}>
      <div className={styles.title}>
        REACH US
      </div>
        <p className={styles.contactDescription}>
          Get in touch with SML NexGen LLP for AI, Cloud, and Custom Software
          solutions. Let&apos;s innovate together - Schedule a free consultation today.
        </p>

        <div className={styles.contactContainer}>
          {/* Laptop Animation */}
          <div className={styles.laptopContainer}>
            <model-viewer
              className={styles.model}
              alt="Laptop Model"
              src="/models/laptop.glb"
              shadow-intensity="1"
              camera-controls
              touch-action="pan-y"
              exposure="1.5"
              disable-zoom
              disable-tap
              camera-orbit="-30deg 70deg 10m"
              field-of-view="35deg"
              interaction-prompt="auto"
              ar
              autoplay
              loading="eager"
            ></model-viewer>
          </div>

          {/* Contact Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><FaUser /></span>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
              {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><MdEmail /></span>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><BsTelephone /></span>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  pattern="^\+?[0-9]{10,14}$"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
              {errors.phone && <p className={styles.errorMessage}>{errors.phone}</p>}

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><FaComment /></span>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                ></textarea>
              </div>
              {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.sendButton}>Send</button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15566.816478141005!2d77.8186462!3d12.7327153!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae7118acaa712f%3A0x233b1e8f19aef966!2sSmlnexgen%20llp!5e0!3m2!1sen!2sin!4v1724334760463!5m2!1sen!2sin" 
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Smlnexgen LLP Location"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactForm;

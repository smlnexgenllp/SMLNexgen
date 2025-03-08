"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import styles from '../styles/ProfileView.module.css';

const ProfileView = () => {
  // Define static user data
  const staticUser = {
    name: "Dhanush",
    email: "xyz@gmail.com",
    phone: "9876543106",
    address: "123 Main Street, Bangalore, India",
    gender: "Male",
    profilePhoto: null, // No initial photo, will use fallback or uploaded image
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(staticUser);
  const [newPassword, setNewPassword] = useState('');
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Sync editedUser with staticUser when not editing
  useEffect(() => {
    if (!isEditing) {
      setEditedUser(staticUser);
    }
  }, [isEditing, staticUser]); // Added staticUser to dependency array

  const handleEdit = () => {
    setEditedUser(staticUser);
    setNewPassword('');
    setIsEditing(true);
  };

  const handleSave = () => {
    // For static data, just update the editedUser state and exit editing
    console.log("Saved user data:", { ...editedUser, password: newPassword || undefined });
    setEditedUser({ ...editedUser, password: newPassword || undefined });
    setIsEditing(false);
    setNewPassword('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewPassword('');
  };

  // Trigger file input when "Choose Photo" is clicked
  const handleChoosePhoto = () => {
    fileInputRef.current.click();
  };

  // Handle file selection and update profile photo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profilePhoto: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file); // Convert image to base64 for preview
    }
  };

  const displayUser = isEditing ? editedUser : staticUser;

  return (
    <div className={styles.profileContainer}>
      {/* Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.profileName}>{displayUser.name}</h2>
          <div className={styles.photoContainer}>
            <Image
              src={displayUser.profilePhoto || '/default-profile.png'} // Fallback image
              alt="Profile"
              width={100} // Set a fixed width (adjust as needed)
              height={100} // Set a fixed height (adjust as needed)
              className={styles.profileImage}
            />
            {isEditing && (
              <button
                className={styles.choosePhotoButton}
                onClick={handleChoosePhoto}
              >
                Choose Photo
              </button>
            )}
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className={styles.fileInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Details Section */}
      <div className={styles.profileDetails}>
        {isEditing ? (
          <>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Name:</span>
              <input
                className={styles.inputField}
                value={editedUser.name || ''} // Controlled input
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email:</span>
              <input
                className={styles.inputField}
                value={editedUser.email || ''} // Controlled input
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone:</span>
              <input
                className={styles.inputField}
                value={editedUser.phone || ''} // Controlled input
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Address:</span>
              <input
                className={styles.inputField}
                value={editedUser.address || ''} // Controlled input
                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Gender:</span>
              <select
                className={styles.selectField}
                value={editedUser.gender || ''} // Controlled input
                onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>New Password:</span>
              <input
                type="password"
                className={styles.inputField}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current"
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email:</span>
              <p className={styles.detailText}>{displayUser.email}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone:</span>
              <p className={styles.detailText}>{displayUser.phone}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Address:</span>
              <p className={styles.detailText}>{displayUser.address}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Gender:</span>
              <p className={styles.detailText}>{displayUser.gender}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Password:</span>
              <p className={styles.detailText}>********</p>
            </div>
          </>
        )}
      </div>

      {/* Actions Section */}
      <div className={styles.profileActions}>
        {isEditing ? (
          <>
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className={styles.editButton} onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
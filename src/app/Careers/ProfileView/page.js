"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ImageCropper from "./ImageCropper"; // Adjust the import path as needed
import styles from "../styles/ProfileView.module.css";

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch user details on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      fetch(`http://192.168.0.197:5000/api/users/getUserDetails?email=${storedUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setEditedUser(data);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, []);

  const handleEdit = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.id) {
      return alert("User not logged in");
    }
    const formData = new FormData();
    formData.append("fullName", editedUser.fullName);
    formData.append("email", editedUser.email);
    formData.append("phone", editedUser.phone);
    formData.append("address", editedUser.address);
    formData.append("gender", editedUser.gender);
    if (fileInputRef.current.files[0]) {
      const blob = await fetch(editedUser.profilePic).then(r => r.blob());
      const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
      formData.append("profilePic", file);
    }

    try {
      const response = await fetch(`http://192.168.0.197:5000/api/users/${storedUser.id}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        setIsEditing(false);
        window.location.reload();
      } else {
        alert("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Error updating user details");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
    setShowCropper(false);
  };

  const handleChoosePhoto = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profilePic: reader.result });
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImage) => {
    setEditedUser({ ...editedUser, profilePic: croppedImage });
    setShowCropper(false);
  };

  const displayUser = isEditing ? editedUser : user;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      {/* Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.profileName}>{displayUser.fullName}</h2>
          <div className={styles.photoContainer}>
            <Image
              src={displayUser.profilePic || "/default-profile.png"}
              alt="Profile"
              width={100}
              height={100}
              className={styles.profileImage}
            />
            {isEditing && (
              <button className={styles.choosePhotoButton} onClick={handleChoosePhoto}>
                Choose Photo
              </button>
            )}
          </div>
          {showCropper && (
            <ImageCropper
              imageSrc={editedUser.profilePic}
              onCrop={handleCrop}
              onCancel={() => setShowCropper(false)}
            />
          )}
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
                value={editedUser.fullName || ""}
                onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email:</span>
              <input
                className={styles.inputField}
                value={editedUser.email || ""}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone:</span>
              <input
                className={styles.inputField}
                value={editedUser.phone || ""}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Address:</span>
              <input
                className={styles.inputField}
                value={editedUser.address || ""}
                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Gender:</span>
              <select
                className={styles.selectField}
                value={editedUser.gender || ""}
                onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>UserId:</span>
              <p className={styles.detailText}>{displayUser.id}</p>
            </div>
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

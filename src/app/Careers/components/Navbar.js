"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/nav.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        if (data.user) {
          setUser(data.user); // Store user data in state
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.logo}>
        <a href="/Careers">
          <Image src="/sml-logo.png" alt="logo" width={100} height={100} />
        </a>
      </div>
      <nav className={styles.nav}>
        <a href="/Careers/Apply">Apply Now</a>
        <a href="/Careers/RecruitmentFraud">Recruitment fraud alert</a>

        {user ? (
          <div className={styles.userProfile} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className={styles.userName}>{user.fullName || user.email}</span> {/* Show username */}
            <Image
              src={user.profilePic || "/default-avatar.png"}
              alt="Profile"
              width={30}
              height={30}
              className={styles.profileImage}
            />
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <a href="/Careers/ProfileView"><FaUser /> Profile</a>
                <a href="/Careers/JobApplications"><FaCog /> My Activity</a>
                <a href="#" onClick={handleLogout}><FaSignOutAlt /> Logout</a>
              </div>
            )}
          </div>
        ) : (
          <a href="/Careers/Login">Login</a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

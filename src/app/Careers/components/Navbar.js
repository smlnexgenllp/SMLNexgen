"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import styles from "../styles/nav.module.css";

const API_BASE_URL = "https://sml-backend-qgp6.onrender.com"; // Adjust the URL as needed

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Get user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Handle logout and redirect to login page after logout
  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    router.push("/Careers/Login");
  };

  // Use useCallback to memoize the scroll handling function
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    if (scrollY !== window.lastScrollY) {
      setIsNavbarVisible(scrollY < window.lastScrollY);
      setIsScrolledUp(scrollY > 0);
      window.lastScrollY = scrollY;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.lastScrollY = window.scrollY;
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <header
      className={`
        ${styles.navbarContainer}
        ${isNavbarVisible ? styles.visible : styles.hidden}
        ${isScrolledUp ? styles.whiteNavbar : ""}
      `}
    >
      <div className={styles.logo}>
        <a href="/Home">
          <Image src="/sml-logo.png" alt="logo" width={120} height={40} />
        </a>
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <a href="/Careers">Home</a>
        <a href="/Careers/Apply">Apply Now</a>
        <a href="/Careers/RecruitmentFraud">Recruitment fraud alert</a>

        {user ? (
          <div className={styles.userProfile} ref={dropdownRef}>
            <button
              className={styles.profileButton}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className={styles.userName}>
                {user.fullName || user.email}
              
              </span>
              <Image
                src={
                  user.profilePic
                    ? `${API_BASE_URL}${user.profilePic}`
                    : "/placeholder-avatar.png"
                }
                alt="Profile"
                width={30}
                height={30}
                className={styles.profileImage}
              />
            </button>
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <a href="/Careers/ProfileView">
                  <FaUser /> Profile
                </a>
                <a href="/Careers/MyActivity">
                  <FaCog /> My Activity
                </a>
                <a href="#" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <a href="/Careers/Login">Login</a>
        )}
      </nav>
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar;

"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { MdHome, MdInfo, MdBuild, MdEmail, MdWork, MdArticle, MdEngineering, MdMenu, MdClose } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/navbar.module.css";

const menuItems = [
  { title: "Home", icon: <MdHome />, link: "/Home" },
  { title: "About", icon: <MdInfo />, link: "/Home/About" },
  { title: "Services", icon: <MdBuild />, link: "/Home/Services" },
  { title: "Portfolio", icon: <MdWork />, link: "/Home/Portfolio/1" },
  // { title: "Blog", icon: <MdArticle />, link: "/Home#blog" },
  { title: "Careers", icon: <MdEngineering />, link: "/Careers" },
  { title: "Contact", icon: <MdEmail />, link: "/Home/Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/Home";

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

  const handleScrollToSection = useCallback((event, sectionId) => {
    if (isHomePage) {
      event.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isHomePage]);

  return (
    <nav
      className={`
        ${styles.navbar} 
        ${isNavbarVisible ? styles.visible : styles.hidden} 
        ${isScrolledUp ? styles.whiteNavbar : ""} 
        ${isHomePage && !isScrolledUp ? styles.transparentNavbar : styles.transparentBlackText}
      `}
    >
      <div className={styles.logo}>
        <Link href="/Home">
          <Image src="/sml-logo.png" alt="Company Logo" width={120} height={40} priority />
        </Link>
      </div>
  
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {menuItems.map((item) => {
          const isSectionLink = item.link.startsWith("/Home#") && item.title !== "Portfolio";
          const sectionId = isSectionLink ? item.link.split("#")[1] : null;
  
          return (
            <Link
              key={item.title}
              href={item.link}
              className={styles.navLink}
              onClick={isSectionLink ? (e) => handleScrollToSection(e, sectionId) : undefined}
            >
              <button
                type="button"
                title={item.title}
                className={isHomePage && !isScrolledUp ? styles.whiteText : styles.blackText}
              >
                <span className="nav-title">{item.title}</span>
                <span className={styles["nav-icon"]}>{item.icon}</span>
              </button>
            </Link>
          );
        })}
      </div>
  
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button" 
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Open main menu</span>
          {/* You can use icons from react-icons for hamburger and close symbols */}
          {!isMobileMenuOpen ? <MdMenu className="h-6 w-6" /> : <MdClose className="h-6 w-6" />}
        </button>
      </div>
  
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 z-10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const isSectionLink = item.link.startsWith("/Home#") && item.title !== "Portfolio";
              const sectionId = isSectionLink ? item.link.split("#")[1] : null;
  
              return (
                <Link
                  key={item.title}
                  href={item.link}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={(e) => {
                    if (isSectionLink) {
                      handleScrollToSection(e, sectionId);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
const DesktopFooter = dynamic(() => import('./DesktopFooter'));
const MobileFooter = dynamic(() => import('./MobileFooter'));

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Set initial state
      setIsMobile(window.innerWidth < 1025);
      
      // Event listener for resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1025);
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
}

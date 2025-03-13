"use client";

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function LayoutWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced timer to match the faster preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Changed from 3000 to 2000 ms
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader />
      <div 
        style={{ 
          opacity: loading ? 0 : 1, 
          visibility: loading ? 'hidden' : 'visible',
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </>
  );
}
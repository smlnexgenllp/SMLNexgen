"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user already accepted cookies
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      // If no cookie found, show banner
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Set a cookie so we know the user accepted
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  // Hide the banner once accepted
  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1C74BB", // Adjust to your desired blue
        color: "#fff",
        padding: "16px",
        zIndex: 9999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
      }}
    >
      <div style={{ marginRight: "16px", lineHeight: 1.4 }}>
        <p style={{ margin: 0 }}>
          We use cookies on this site to enhance your user experience. By
          continuing to browse our website, you agree to the use of cookies. You
          can manage your cookie preferences by adjusting your browser settings.
          <a
            href="/cookie-policy" // or wherever your policy is
            style={{ color: "#fff", textDecoration: "underline", marginLeft: "4px" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
      </div>
      <button
        onClick={handleAccept}
        style={{
          backgroundColor: "#fff",
          color: "#1C74BB",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Accept Cookies
      </button>
    </div>
  );
}

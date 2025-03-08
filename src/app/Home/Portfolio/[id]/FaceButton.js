"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FaceButton() {
  const faceButtonRef = useRef(null);
  const faceContainerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const faceButton = faceButtonRef.current;
    const faceContainer = faceContainerRef.current;
    const container = containerRef.current;

    if (!faceButton || !container) return;

    const containerCoords = container.getBoundingClientRect();

    const handleMouseMove = (e) => {
      const mouseX = e.pageX - container.offsetLeft;
      const mouseY = e.pageY - container.offsetTop;

      gsap.to(faceButton, {
        duration: 0.3,
        x: ((mouseX - containerCoords.width / 2) / containerCoords.width) * 50,
        y: ((mouseY - containerCoords.height / 2) / containerCoords.width) * 50,
        ease: "power4.out",
      });

      gsap.to(faceContainer, {
        duration: 0.3,
        x: ((mouseX - containerCoords.width / 2) / containerCoords.width) * 25,
        y: ((mouseY - containerCoords.height / 2) / containerCoords.width) * 25,
        ease: "power4.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(faceButton, { duration: 0.3, scale: 0.975 });
    };

    const handleMouseLeave = () => {
      gsap.to(faceButton, { duration: 0.3, x: 0, y: 0, scale: 1 });
      gsap.to(faceContainer, { duration: 0.3, x: 0, y: 0, scale: 1 });
    };

    faceButton.addEventListener("mousemove", handleMouseMove);
    faceButton.addEventListener("mouseenter", handleMouseEnter);
    faceButton.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      faceButton.removeEventListener("mousemove", handleMouseMove);
      faceButton.removeEventListener("mouseenter", handleMouseEnter);
      faceButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="container"
      ref={containerRef}
      className="container"
      style={{
        "--black": "#2a2927",
        "--white": "#fff",
        "--face": "#fdda5f",
        "--face-shadow": "#fd9744",
      }}
    >
      <button className="face-button" ref={faceButtonRef}>
        <span className="face-container" ref={faceContainerRef}>
          <span className="eye left"></span>
          <span className="eye right"></span>
          <span className="mouth"></span>
        </span>
      </button>
    </div>
  );
}

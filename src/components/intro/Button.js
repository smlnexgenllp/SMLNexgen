"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For Next.js 14 in the app directory

export default function RiveButton() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const { rive, RiveComponent } = useRive({
    src: "/hero_use_case.riv",
    artboard: "Button",
    stateMachines: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  const isHoverInput = useStateMachineInput(rive, "State Machine 1", "isHover");
  const router = useRouter();

  const onButtonActivate = useCallback(() => {
    if (rive && isHoverInput) isHoverInput.value = true;
  }, [rive, isHoverInput]);

  const onButtonDeactivate = useCallback(() => {
    if (rive && isHoverInput) isHoverInput.value = false;
  }, [rive, isHoverInput]);

  // **Preload the next route when the component mounts**
  useEffect(() => {
    router.prefetch("/Home");
  }, [router]);

  // GSAP Fade-in effect
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power1.out" }
      );
    }
  }, []);

  // Fast Click Handling with Reduced GSAP Duration
  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
      gsap.to(containerRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 0.5, // Faster transition
        ease: "power1.inOut",
        onComplete: () => {
          router.replace("/Home"); // Fast navigation
        },
      });
    },
    [router]
  );

  // Text scramble effect on header using an interval
  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    // Save the original text in a data attribute.
    headerElement.dataset.value = headerElement.textContent;

    // A string containing uppercase letters, digits, and symbols.
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:'\",.<>/?";

    // Function to scramble the text.
    const scrambleText = () => {
      let iteration = 0;
      const scrambleInterval = setInterval(() => {
        headerElement.innerText = headerElement.dataset.value
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return headerElement.dataset.value[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        iteration += 1 / 3;
        if (iteration >= headerElement.dataset.value.length) {
          clearInterval(scrambleInterval);
        }
      }, 30);
    };

    // Run the scramble effect immediately on mount.
    scrambleText();

    // Then run it automatically every 10 seconds.
    const interval = setInterval(scrambleText, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      const container = headerRef.current.parentElement;
      container.style.width = `${headerRef.current.offsetWidth}px`;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
    >
      {/* Fixed-width container for the header */}
      <div style={{width: `${headerRef.current?.offsetWidth}px`}} >
        <h1
          ref={headerRef}
          className="font-audiowide font-bold text-white text-5xl lg:text-6xl pb-2"
          style={{
            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
            userSelect: "none", // Standard property
            WebkitUserSelect: "none", // For Safari
            MozUserSelect: "none", // For Firefox
            msUserSelect: "none", // For Internet Explorer/Edge
          }}
        >
          SMLNEXGEN
        </h1>
      </div>

      <div className="rive-button-container relative w-1/2 pt-[25%] mx-auto" >
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <Link
            href="/Home"
            aria-label="Start now; explore the SMLNEXGEN homepage"
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full bg-transparent text-white text-sm lg:text-lg"
            style={{
              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              userSelect: "none", // Standard property
              WebkitUserSelect: "none", // For Safari
              MozUserSelect: "none", // For Firefox
              msUserSelect: "none", // For Internet Explorer/Edge
            }}
            onMouseEnter={onButtonActivate}
            onMouseLeave={onButtonDeactivate}
            onFocus={onButtonActivate}
            onBlur={onButtonDeactivate}
            onClick={onButtonClick}
          >
            EXPLORE
          </Link>
          <RiveComponent aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
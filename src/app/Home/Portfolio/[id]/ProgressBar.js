"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./progress.css";
import FaceButton from "./FaceButton";  

const progressData = {
  "1": {
    progress: [40, 70, 90, 100],
    messages: ["E-COMMERCE", "RESPONSIVE DESIGN", "CUSTOM WEBSITES", "UI/UX DESIGN"],
  },
  "2": {
    progress: [30, 60, 80, 100],
    messages: ["MOBILE DEVELOPMENT", "ANDROID APPS", "iOS APPS", "CROSS-PLATFORM"],
  },
  "4": {
    progress: [10, 40, 70, 100],
    messages: ["CUSTOM SOFTWARE","SYSTEM INTEGRATIONS", "SOFTWARE MAINTENANCE", "IT CONSULTING & SUPPORT"],
  },
  "5": {
    progress: [10, 40, 70, 100],
    messages: ["WORKFLOW AUTOMATION", "PROCESS INTEGRATION", "REPORTING AUTOMATION", "BUSINESS INTELLIGENCE SOLUTIONS"],
  },
  "6": {
    progress: [10, 40, 70, 100],
    messages: ["BUSINESS CONSULTANCY", "STRATEGIC PLANNING", "IMPLEMENTATION SERVICES", "OPERATIONAL EFFICIENCY SOLUTIONS"],
  },
};

export default function ProgressBar() {
  const { id } = useParams();
  const progressInfo = progressData[id] || progressData["1"];

  const [progress, setProgress] = useState([...progressInfo.progress]);
  const [showMessage, setShowMessage] = useState(Array(progress.length).fill(false));
  const messages = progressInfo.messages;
  const colors = ["#FF5733", "#2196F3", "#4CAF50", "#FFC107"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress.map((value, index) => {
          if (value >= 100) {
            setShowMessage((prev) => {
              const newShowMessage = [...prev];
              newShowMessage[index] = true; // Show message
              return newShowMessage;
            });

            setTimeout(() => {
              setProgress((prev) =>
                prev.map((val, i) => (i === index ? 0 : val)) // Reset only the completed one
              );

              setShowMessage((prev) => {
                const newShowMessage = [...prev];
                newShowMessage[index] = false; // Hide message after reset
                return newShowMessage;
              });
            }, 1000); // Keep message visible for 1s

            return value;
          }
          return value + 10; // Increase progress by 10 at a medium pace
        })
      );
    }, 800); // Medium speed

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="progressWithFace">
      <div className="progressContainer">
        {progress.map((value, index) => (
          <div key={index} className="progressWrapper">
            <progress
              value={value}
              max="100"
              style={{
                "--progress-value-color": colors[index],
              }}
            ></progress>
            <span className="progressPercent">{value >= 100 ? "100%" : ""}</span>
            {showMessage[index] && <div className="popup">{messages[index]}</div>}
          </div>
        ))}
      </div>

      <div className="faceButtonContainer">
        <FaceButton />
      </div>
    </div>
  );
}

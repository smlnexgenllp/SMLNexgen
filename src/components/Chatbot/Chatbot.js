"use client";
import { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import AppointmentForm from "./AppointmentForm"; // Import the AppointmentForm component
import styles from "./Chatbot.module.css";

const ChatbotComponent = () => {
  const [showChat, setShowChat] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // State for form visibility

  const handleToggleChat = () => {
    if (showChat) {
      setAnimateClose(true);
      setTimeout(() => {
        setShowChat(false);
        setAnimateClose(false);
      }, 300); // Match animation duration
    } else {
      setShowChat(true);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Chat Button with Icon */}
      <button className={styles.chatbotButton} onClick={handleToggleChat}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 64 64" fill="white">
          <g>

            <path d="M32 4C17.64 4 6 14.98 6 28c0 6.62 2.66 12.68 7 17.29V58l12-8c2.64.66 5.42 1 7.98 1 14.36 0 26-10.98 26-24S46.36 4 32 4z"
              fill="#06038D" stroke="#06038D" strokeWidth="8" strokeLinejoin="round" />
          </g>
        </svg>
      </button>


      {showChat && (
        <div className={`${styles.chatbotBox} ${animateClose ? styles.hide : styles.show}`}>
          {/* Chat Header */}
          <div className={styles.chatbotHeader}>
            <span>Chat with Us</span>
            <button className={styles.closeButton} onClick={handleToggleChat} aria-label="Close Chat">✖</button>
          </div>

          {/* Chatbot Content */}
          <div className={styles.chatbotContent}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
            {formVisible && <AppointmentForm setState={setState} />} {/* Render form when triggered */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;

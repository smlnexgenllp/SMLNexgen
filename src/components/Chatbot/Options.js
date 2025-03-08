import React from "react";
import styles from "./ChatBotOptions.module.css";

const Options = ({ options, actionProvider }) => {
  return (
    <div className={styles.optionsContainer}>
      {options.map((option, index) => (
        <button
          key={index}
          className={styles.optionButton}
          onClick={() => {
            if (typeof actionProvider[option.action] === "function") {
              actionProvider[option.action](option.question); // Pass question text
            } else {
              console.warn(`Action '${option.action}' not found in ActionProvider`);
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Options;

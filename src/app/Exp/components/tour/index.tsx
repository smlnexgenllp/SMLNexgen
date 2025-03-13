"use client";
import React from "react";
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda";
import styles from "./card.module.css";
import confetti from "canvas-confetti";

export const TourCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  // Onborda hooks
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.stepIndicator}>
            {currentStep + 1} of {totalSteps}
          </div>
          <div className={styles.title}>
            {step.icon} {step.title}
          </div>
        </div>
        <button
          className={styles.closeButton}
          onClick={() => closeOnborda()}
        >
          x
        </button>
      </div>
      <div className={styles.content}>{step.content}</div>
      <div className={styles.navigationContainer}>
        {currentStep !== 0 && (
          <button
            onClick={() => prevStep()}
            className={`${styles.button} ${styles.prevButton}`}
          >
            Previous
          </button>
        )}
        {currentStep + 1 !== totalSteps && (
          <button
            onClick={() => nextStep()}
            className={`${styles.button} ${styles.nextButton}`}
          >
            Next
          </button>
        )}
        {currentStep + 1 === totalSteps && (
          <button
            className={`${styles.button} ${styles.finishButton}`}
            onClick={handleConfetti}
          >
            🎉 Finish!
          </button>
        )}
      </div>
      <span className="text-white">{arrow}</span>
    </div>
  );
};
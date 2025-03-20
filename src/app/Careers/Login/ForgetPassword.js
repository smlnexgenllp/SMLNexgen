//ForgetPassword.js
'use client';

import styles from './register.module.css';
import { useState } from 'react';

const ForgotPasswordForm = ({ setShowForgotPassword }) => {
  const [step, setStep] = useState(1); // 1: email input, 2: OTP input, 3: reset password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const endpoints = [
    'https://api.smlnexgenllp.com/api/users',
  ];

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    for (const baseUrl of endpoints) {
      try {
        const res = await fetch(`${baseUrl}/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
        console.log(`OTP sent to ${email}`);
        setStep(2);
        setSuccess('OTP sent to your email');
        setError('');
        return;
      } catch (err) {
        console.error(`Error with ${baseUrl}:`, err.message);
        if (baseUrl === endpoints[endpoints.length - 1]) {
          setError(err.message || 'Failed to send OTP');
        }
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    // For simplicity, we’ll assume OTP is verified implicitly by moving to step 3
    // You could add a separate endpoint for OTP verification if needed
    setStep(3);
    setSuccess('OTP verified, please set your new password');
    setError('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    for (const baseUrl of endpoints) {
      try {
        const res = await fetch(`${baseUrl}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, newPassword, confirmPassword }), // Include confirmPassword
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to reset password');
        console.log(`Password reset successfully`);
        setSuccess('Password reset successfully! Returning to login...');
        setTimeout(() => {
          setShowForgotPassword(false);
          setEmail('');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
          setStep(1);
        }, 2000);
        setError('');
        return;
      } catch (err) {
        console.error(`Error with ${baseUrl}:`, err.message);
        if (baseUrl === endpoints[endpoints.length - 1]) {
          setError(err.message || 'Failed to reset password');
        }
      }
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.title}>
          {step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Reset Password'}
        </h3>
        <h4 className={styles.subtitle}>
          {step === 1 ? 'Enter your email' : step === 2 ? 'Enter the OTP sent to your email' : 'Set new password'}
        </h4>
      </header>
      <main className={styles.main}>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
        {step === 1 ? (
          <form className={styles.form} onSubmit={handleSendOtp}>
            <div className={styles.boxItem}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                className={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submit}>Send OTP</button>
            <div className={styles.loginOption}>
              <button
                type="button"
                className={styles.loginLink}
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : step === 2 ? (
          <form className={styles.form} onSubmit={handleVerifyOtp}>
            <div className={styles.boxItem}>
              <label className={styles.label}>OTP</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submit}>Verify OTP</button>
            <div className={styles.loginOption}>
              <button
                type="button"
                className={styles.loginLink}
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleResetPassword}>
            <div className={styles.boxItem}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.boxItem}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Fixed to update confirmPassword
                required
              />
            </div>
            <button type="submit" className={styles.submit}>Reset Password</button>
            <div className={styles.loginOption}>
              <button
                type="button"
                className={styles.loginLink}
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default ForgotPasswordForm;

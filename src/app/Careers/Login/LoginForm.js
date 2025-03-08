'use client';

import { useState, useEffect } from 'react';
import styles from './register.module.css'; // Assuming this is the correct stylesheet
import ForgotPasswordForm from '../Login/ForgetPassword'; // Adjust path if needed

const LoginForm = ({ setShowLogin }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoints = [
      'http://localhost:5000/api/users/login',
      'http://192.168.0.197:5000/api/users/login',
    ];

    const loginData = { email, password };

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        });

        const data = await res.json();
        console.log(`Login response from ${url}:`, data);

        if (!res.ok) {
          throw new Error(data.message || `Login failed at ${url}`);
        }

        // Save user session (can be localStorage, context, or cookies)
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect on successful login
        window.location.href = '/Careers/Apply';
        return; // Exit loop on success
      } catch (err) {
        console.error(`Error with ${url}:`, err.message);
        if (url === endpoints[endpoints.length - 1]) {
          // If this was the last endpoint, set the error
          setError('Login failed on all servers: ' + err.message);
        }
        // Continue to the next endpoint if not the last one
      }
    }
  };
  return (
    <section className={styles.section}>
      <div className={styles.wave}></div>
      {showForgotPassword ? (
        <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <>
          <header className={styles.header}>
            <h3 className={styles.title}>Login</h3>
            <h4 className={styles.subtitle}>Welcome</h4>
          </header>
          <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
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
              <div className={styles.boxItem}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submit}>Login</button>
              <div className={styles.loginOption}>
                <button
                  type="button"
                  className={styles.loginLink}
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
              <div className={styles.loginOption}>
                Don&apos;t have an account?
                <button
                  type="button"
                  className={styles.loginLink}
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </button>
              </div>
            </form>
          </main>
        </>
      )}
    </section>
  );
};

export default LoginForm;

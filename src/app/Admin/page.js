'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated for App Router
import Cookies from 'js-cookie';
import styles from './page.module.css';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin@123';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      Cookies.set('authToken', 'fake-token-for-testing', { expires: 1, path: '/' });
      router.push('/Admin/Dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Admin Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
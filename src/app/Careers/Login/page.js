'use client';
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import styles from './register.module.css'; // You can reuse the same styles

const App = () => {
    const [showLogin, setShowLogin] = useState(true); // Changed from false to true

    return (
        <div className={styles.container}>
            {showLogin ? (
                <LoginForm setShowLogin={setShowLogin} />
            ) : (
                <RegisterForm setShowLogin={setShowLogin} />
            )}
        </div>
    );
};

export default App;
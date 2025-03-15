'use client';
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import styles from './login.module.css';
 // You can reuse the same styles

 const App = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className={showLogin ? styles.loginContainer : styles.registerContainer}>
            {showLogin ? (
                <LoginForm setShowLogin={setShowLogin} />
            ) : (
                <RegisterForm setShowLogin={setShowLogin} />
            )}
        </div>
    );
};

export default App;
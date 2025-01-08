import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../firebaseHelpers/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      await login(email, password);
      setMessage('Login successful! Redirecting...');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      setMessage('Incorrect email or password');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Please enter your email to reset password');
      return;
    }
    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send password reset email');
    }
  };

  return (
    <div className={styles.loginContainer}>
      {message && <div className={message.includes('successful') ? styles.successMessage : styles.errorMessage}>{message}</div>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.loginButton}>Login</button>
        <button type="button" onClick={handleForgotPassword} className={styles.forgotPasswordButton}>Forgot Password?</button>
      </form>
    </div>
  );
};

export default Login;

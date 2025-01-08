// import React, { useState } from 'react';
// import { useAuth } from '../../firebaseHelpers/AuthContext';
// import styles from './Register.module.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const { register } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(''); // Clear previous messages
//     try {
//       await register(email, password);
//       setMessage('Registration successful! Redirecting...');
//       // Add redirection logic here if needed
//     } catch (error) {
//       setMessage(`Failed to register: ${error.message}`);
//     }
//   };

//   return (
//     <div className={styles.registerContainer}>
//       {message && <div className={message.includes('successful') ? styles.successMessage : styles.errorMessage}>{message}</div>}
//       <form onSubmit={handleSubmit} className={styles.registerForm}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.input}
//         />
//         <button type="submit" className={styles.registerButton}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

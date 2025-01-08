import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../firebaseHelpers/AuthContext';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth(); // Destructure currentUser and logout from useAuth

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="IT Team Logo" className={styles.logoImage} />
      </Link>
      <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        {currentUser ? (
          <>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/service-expiry-tracker" onClick={closeMenu}>Service Expiry Tracker</Link></li>
            <li><Link to="/cctv-configuration" onClick={closeMenu}>CCTV Configuration</Link></li>
            <li><Link to="/mobile-number-configuration" onClick={closeMenu}>Mobile Number Configuration</Link></li>
            <li><Link to="/line-extensions-configuration" onClick={closeMenu}>Line Extensions Configuration</Link></li>
            <li><Link to="/pc-list-configuration" onClick={closeMenu}>PC List Configuration</Link></li>
            <li><button onClick={handleLogout} className={styles.logoutButton}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
            <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

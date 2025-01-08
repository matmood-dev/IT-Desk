import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homepage}>
      <header className={styles.homepageHeader}>
        <h1>YAS Holding IT Department</h1>
        <p>Empowering technology and innovation</p>
      </header>
      <main>
        <section className={styles.services}>
          <h2>Select an option to begin</h2>
          <div className={styles.serviceCards}>
            <Link to="/service-expiry-tracker" className={styles.card}>
              <h3>Service Expiry Tracker</h3>
              <p>Track the expiry dates of various services</p>
            </Link>
            <Link to="/cctv-configuration" className={styles.card}>
              <h3>CCTV Configuration</h3>
              <p>Manage your CCTV cameras</p>
            </Link>
            <Link to="/mobile-number-configuration" className={styles.card}>
              <h3>Mobile Number Configuration</h3>
              <p>Manage your mobile numbers</p>
            </Link>
            <Link to="/line-extensions-configuration" className={styles.card}>
              <h3>Line Extensions Configuration</h3>
              <p>Manage your line extensions</p>
            </Link>
            <Link to="/pc-list-configuration" className={styles.card}> {/* Add the link for the new page */}
              <h3>PC List Configuration</h3>
              <p>Manage your PC list</p>
            </Link>
            {/* <div className={styles.card}>
              <h3>Coming Soon!</h3>
              <p>Coming Soon!</p>
            </div>
            <div className={styles.card}>
              <h3>Coming Soon!</h3>
              <p>Coming Soon!</p>
            </div>
            <div className={styles.card}>
              <h3>Coming Soon!</h3>
              <p>Coming Soon!</p>
            </div> */}
          </div>
        </section>
      </main>
      <footer className={styles.homepageFooter}>
        <p>© 2024 YAS Holding - IT Department. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

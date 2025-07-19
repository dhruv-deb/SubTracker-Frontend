
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, Bell } from 'lucide-react';
import styles from './Landing.module.scss';

// The Landing page is now much simpler as it no longer needs its own Header or Footer.
const Landing = () => {
  return (
    <div className={styles.app}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Never miss a subscription payment again</h1>
          <p className={styles.heroSubtitle}>Smart reminders for all your recurring payments, delivered right to your inbox.</p>
          <Link to="/signup" className={styles.heroCta}>Get Started for Free</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}><Mail /></div>
              <h3 className={styles.featureCardTitle}>Register Subscriptions</h3>
              <p className={styles.featureCardDescription}>
                Easily add and manage all your subscription details in one secure place.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}><Clock /></div>
              <h3 className={styles.featureCardTitle}>Custom Reminders</h3>
              <p className={styles.featureCardDescription}>
                Set personalized reminder frequency and timing that works for your schedule.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}><Bell /></div>
              <h3 className={styles.featureCardTitle}>Email Notifications</h3>
              <p className={styles.featureCardDescription}>
                Receive timely email reminders before your subscription payments are due.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/');
    await logout();
  };

  return (
    <header className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to= "/" className={styles.navBrand}>
          <Bell className={styles.navIcon} />
          <span className={styles.navTitle}>SubTracker</span>
        </Link>
        <nav className={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <Link to="/subscriptions" className={styles.navLink}>My Subscriptions</Link>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>Login</Link>
              <Link to="/signup" className={styles.navCta}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

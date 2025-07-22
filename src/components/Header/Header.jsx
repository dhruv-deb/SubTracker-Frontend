import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading('Logging out...');
    await logout();
    toast.success('Logged out successfully!', { id: toastId });
    navigate('/');
    setIsLoggingOut(false);
    setIsMenuOpen(false); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinksContent = (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/dashboard" className={styles.navLink} onClick={() => isMenuOpen && toggleMenu()}>Dashboard</Link>
          <Link to="/subscriptions" className={styles.navLink} onClick={() => isMenuOpen && toggleMenu()}>My Subscriptions</Link>
          <button onClick={handleLogout} className={styles.logoutButton} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={styles.navLink} onClick={() => isMenuOpen && toggleMenu()}>Login</Link>
          <Link to="/signup" className={styles.navCta} onClick={() => isMenuOpen && toggleMenu()}>Sign Up</Link>
        </>
      )}
    </>
  );

  return (
    <header className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navBrand}>
          <Bell className={styles.navIcon} />
          <span className={styles.navTitle}>SubTracker</span>
        </Link>

        <nav className={styles.navLinksDesktop}>
          {navLinksContent}
        </nav>

        <button className={styles.hamburger} onClick={toggleMenu}>
          <Menu size={28} />
        </button>

        {isMenuOpen && (
          <div className={styles.mobileNavOverlay}>
            <nav className={styles.navLinksMobile}>
              <button className={styles.closeButton} onClick={toggleMenu}>
                  <X size={32} />
              </button>
              {navLinksContent}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

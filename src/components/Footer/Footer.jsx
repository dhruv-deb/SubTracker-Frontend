import React from 'react';
import { Bell, Github, TwitterIcon, Linkedin } from 'lucide-react';
import styles from './Footer.module.scss';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Bell className={styles.footerIcon} />
            <span className={styles.footerTitle}>SubTracker</span>
          </div>
          
          {/* <div className={styles.footerLinks}>
            <a href="#contact" className={styles.footerLink}>Contact</a>
            <a href="#privacy" className={styles.footerLink}>Privacy</a>
            <a href="#terms" className={styles.footerLink}>Terms</a>
          </div> */}
          
          <div className={styles.footerSocial}>
            <a href="#" className={styles.footerSocialLink}>
              <TwitterIcon size={20} />
            </a>
            <a href="#" className={styles.footerSocialLink}>
              <Github size={20} />
            </a>
            <a href="#" className={styles.footerSocialLink}>
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className={styles.footerCopyright}>
          <p>&copy; 2025 SubTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


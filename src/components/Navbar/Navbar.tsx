'use client';
import { useState } from 'react';
import styles from  './navbar.module.css'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <section className={styles.navLogo}>
        <img src='./logo.svg' alt='Commscope' />
      </section>
      
      <section className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
        <ul>
          <li>HOME</li>
          <li>ABOUT THE EVENT</li>
          <li>AGENDA</li>
          <li>VENUE</li>
          <li>CONTACT</li>
        </ul>
      </section>
      
      <section className={styles.navRegister}>
        <button className={styles.registerButton}></button>
      </section>
      
      {/* Mobile menu toggle */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
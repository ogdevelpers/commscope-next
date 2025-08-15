'use client';
import { useState } from 'react';
import styles from './navbar.module.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // Close mobile menu after clicking (if open)
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <section className={styles.navLogo}>
        <img src='./logo.svg' alt='Commscope' />
      </section>
      
      <section className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
        <ul>
          <li onClick={() => scrollToSection('home')}>HOME</li>
          <li onClick={() => scrollToSection('about')}>ABOUT THE EVENT</li>
          <li onClick={() => scrollToSection('agenda')}>AGENDA</li>
          <li onClick={() => scrollToSection('venue')}>VENUE</li>
          <li onClick={() => scrollToSection('contact')}>CONTACT</li>
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
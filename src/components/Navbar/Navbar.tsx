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
    
    </nav>
  );
}
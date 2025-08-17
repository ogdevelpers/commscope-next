import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer"; 
import CommScopeRegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import { TermsAndConditions } from "@/components/TermsAndConditions/TermsAndConditions";

export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <Navbar />
      <section id="home" className={styles.heroSection}>
        <div className={styles.heroContentContainer}>
          <section className={styles.heroContent1}>
            <div className={styles.heroTitle}>COMMSCOPE</div>
            <div className={styles.heroTitleCaption}>TECHNOLOGY FORUM 2025</div>
            <div className={styles.heroTitleLocation}>BANGKOK - THAILAND</div>
          </section>

          <section className={styles.heroContent2}>
            <div className={styles.heroSubtitle}>Next-Gen Connectivity: AI, Data Centers,</div>
            <div className={styles.heroSubtitleMore}>Smart Buildings & Beyond</div>
          </section>

          <div className={styles.heroNotes}>
            <div>29th Sept</div>
            <div>The Peninsula</div>
          </div>
        </div>
      </section>
      
      <section className={styles.registrationSection}>
        <CommScopeRegistrationForm />
        <TermsAndConditions />
      </section>
      
      <Footer />
      </div>
    </>
  );
}
'use client';
import Footer from "@/components/Footer/Footer";

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import styles from './submission.module.css';
import { ThankYouSection } from "@/components/ThankYou/ThankYou";
import Navbar from "@/components/Navbar/Navbar";


function SubmissionContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('name');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const nameParam = searchParams.get('name') || 'Guest';
    setName(nameParam);
    setIsLoaded(true);
  }, [searchParams]);
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <section className={styles.thankYouSection}>
          < ThankYouSection name={name} />
        </section>
        <section id="venue" className={styles.directionSection}>
          <section className={styles.directionSectionInner}>
            <div className={styles.directionContainer}>
              <div className={styles.venueCard}>
                <div className={styles.venueHeader}>
                  <span className={styles.venueLabel}>VENUE</span>
                </div>

                <div className={styles.venueInfo}>
                  <h2 className={styles.venueTitle}>THE PENINSULA</h2>
                  <p className={styles.venueLocation}>BANGKOK, THAILAND</p>
                </div>

                <a href="https://www.peninsula.com/en/bangkok/5-star-luxury-hotel-riverside" target="_blank" rel="noopener noreferrer">
                  <button className={styles.directionButton}>
                    GET DIRECTION
                  </button>
                </a>
              </div>

              <div id="contact" className={styles.contactInfo}>
                <p className={styles.contactText}>
                  For information on visa eligibility and related details, please <a href='https://www.thaiembassy.com/thailand-visa/thailand-visa-types' target='_blank'>click here! </a>             </p>
              </div>
            </div>
          </section>
        </section>

        <section className={styles.dirErectionSection}>
          <div className={styles.dirErectionDiv}>
            <div className={styles.dirErectionContact}>Contact</div>
            <div className={styles.dirErectionForAny}>For any other requests related to the conference and logistics on ground, please do not hesitate to contact:</div>
            <div className={styles.dirErectionEmail}><img src="./Isolation_mode.svg" alt="cru" />  MEAMarketing@commscope.com </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}


export default function Page() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <Navbar />
        <section className={styles.thankYouSection}>
          <ThankYouSection name="Loading..." />
        </section>
      </div>
    }>
      <SubmissionContent />
    </Suspense>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ItenaryListBox from "@/components/ItenaryListBox/ItenaryListBox";

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
      
      <section id="about" className={styles.messageSection}>
        <div className={styles.messageContainer}>
          <p className={styles.messageText}>
            Dear Valued Customer,
          </p>

          <p className={styles.messageText}>
            On behalf of the CommScope team, we are pleased to invite you to the <span className={styles.messageHighlight}>CommScope Technology Forum 2025</span>, taking place from <span className={styles.messageHighlight}>29th September to 2nd October 2025</span> at <span className={styles.messageHighlight}>The Peninsula – Bangkok, Thailand</span>.
          </p>

          <p className={styles.messageText}>
            As we look towards a more connected, intelligent, and sustainable future, this year's forum is themed: <span className={styles.messageHighlight}>Next-Gen Connectivity: AI, Data Centres, Smart Buildings & Beyond</span>.
          </p>

          <p className={styles.messageText}>
            The agenda will explore how next-generation infrastructure is reshaping industries around the world—and how CommScope is driving this transformation.
          </p>

          <p className={styles.messageText}>
            Join industry leaders, innovators, and technology experts for an unforgettable experience in one of Asia's most dynamic cities. This year's forum will highlight groundbreaking innovations powering the digital future. Gain exclusive insights into:
          </p>

          <ul className={styles.messageList}>
            <li className={styles.messageListItem}>AI-powered infrastructure redefining connectivity and automation.</li>
            <li className={styles.messageListItem}>Future-ready data centres built to meet tomorrow's demands.</li>
            <li className={styles.messageListItem}>Smart building technologies enabling greener, more efficient environments.</li>
            <li className={styles.messageListItem}>The next wave of innovation—edge computing, 5G, IoT, and more.</li>
          </ul>

          <p className={styles.messageText}>
            We are excited to host you at <span className={styles.messageHighlight}>The Peninsula – Bangkok, Thailand</span>, from <span className={styles.messageHighlight}>29th September to 2nd October 2025</span> for a dynamic gathering of knowledge sharing, networking, and strategic dialogue.
          </p>

          <p className={styles.messageText}>
            We look forward to welcoming you to Thailand!
          </p>

          <div className={styles.messageSignature}>
            <p className={styles.messageText}>Best regards,</p>
            <p className={styles.messageHighlight}>The CommScope Team</p>
          </div>
        </div>
      </section>
      
      <section id="agenda" className={styles.itenarySection}>
        <div className={styles.itenaryContainer}>
          <div className={styles.itenaryTitleBox}>
            <div className={styles.agenda}>AGENDA</div>
            <div className={styles.itenaryTitle}>EVENT ITENARY</div>
          </div>
        </div>

        <section className={styles.itenaryPunchComponentSection}>
          <ItenaryListBox />
        </section>
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

              <button className={styles.directionButton}>
                GET DIRECTION
              </button>
            </div>

            <div id="contact" className={styles.contactInfo}>
              <p className={styles.contactText}>
                For visa requirements and any other requests related to the conference and logistics on ground, please do not hesitate to contact:
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor" />
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className={styles.contactLabel}>Commscope Team</span>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" fill="none" />
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <span className={styles.contactLabel}>Nikita.Kandath@commscope.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
      </div>
    </>
  );
}
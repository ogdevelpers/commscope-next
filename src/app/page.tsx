import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar/>
        <section className={styles.heroSection}>
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
        <section className={styles.messageSection}>
          
<section className={styles.messageSection}>
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
        </section>
        <section></section>
        <section></section>
      <Footer/>
    </>
  );
}

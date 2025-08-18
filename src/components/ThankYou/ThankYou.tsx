'use client';
import styles from './thankyou.module.css';

interface ThankYouSectionProps {
  name: string; 
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({ name }: ThankYouSectionProps) => {
  
  const onDownloadCalendar = ()=>{
    const link = document.createElement("a");
    link.href = "https://commscope.msdplus.com/invite/Save_the_Date-CommScope_Technology_Forum_2025_New.ics"; 
    link.download = "Save_the_Date-CommScope_Technology_Forum_2025_New.ics";
    link.click();
  };
  const onBackToHome= ()=>{
    window.location.href =
      "https://commscope.msdplus.com/CommScope-Technology-Forum-2025/";
  };

  return (
    <div className={styles.thankYouContainer}>
      <h1 className={styles.title}>Thank You for Registering!</h1>

      <div className={styles.content}>
        <p className={styles.greeting}>Dear {name},</p>
        <p>
          Thank you for registering for the <span className={styles.link}>CommScope Technology Forum 2025</span>. Your registration is now confirmed.
        </p>
        <i><p>
          Note: If you wish to cancel your booking, please inform us immediately at <span className={styles.email}>commscope@msdplus.com</span>.
        </p></i>
        <p>
          The event will take place at <span className={styles.link}> <a href='https://msdplus.com/hotel' target="_blank">The Peninsula, Bangkok</a> </span>, from 29th September to 2nd October 2025.
        </p>
        <p>We look forward to welcoming you to Bangkok, Thailand.</p>
        <p className={styles.signature}>Best Regards,</p>
        <p className={styles.signature}>The CommScope Team</p>
        <p className={styles.contact}>For more information, please contact: <span className={styles.email}>commscope@msdplus.com</span></p>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.downloadButton} onClick={onDownloadCalendar}>
          DOWNLOAD CALENDAR TO LINK
        </button>
        <button className={styles.homeButton} onClick={onBackToHome}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};
'use client';
import styles from './thankyou.module.css';

interface ThankYouSectionProps {
  name: string; 
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({ name }: ThankYouSectionProps) => {
  
  // const onDownloadCalendar = ()=>{
  //   const link = document.createElement("a");
  //   link.href = "https://commscope.msdplus.com/invite/Save_the_Date-CommScope_Technology_Forum_2025_New.ics"; 
  //   link.download = "Save_the_Date-CommScope_Technology_Forum_2025_New.ics";
  //   link.click();
  // };
  // const onBackToHome= ()=>{
  //   window.location.href =
  //     "https://commscope.msdplus.com/CommScope-Technology-Forum-2025/";
  // };

  return (
    <div className={styles.thankYouContainer}>
      <h1 className={styles.title}>Thank You for Registering!</h1>

    <div className={styles.content}>
      <div className={styles.greeting}>Dear {name},</div>
      {/* <div>
        Thank you for registering to join the <span className={styles.link}><a href='https://commscope.msdplus.com/CommScope-Technology-Forum-2025/' target="_blank" rel="noopener noreferrer">CommScope Technology Forum 2025</a></span>. Your registration is now confirmed.
      </div> */}
      {/* <div style={{ fontStyle: 'italic' }}>
        Note: If you wish to cancel your booking, please inform us immediately at <span className={styles.email}>commscope@msdplus.com</span>.
      </div> */}
      {/* <div>
        The event will take place at <span className={styles.link}> <a href='https://msdplus.com/hotel' target="_blank" rel="noopener noreferrer">The Peninsula, Bangkok</a> </span>, from 29th September to 2nd October 2025.
      </div> */}
      <div style={{color: 'white'}}>
      We’re pleased to confirm your registration for an evening at the Cé La Vi Club Lounge, Address Sky View Hotel, on Tuesday, 14th October. Join us for a relaxed networking dinner with fine food and drinks and connect with fellow professionals from the ICT sector. We look forward to your presence at this exclusive gathering.
      </div>
      <div style={{color: 'white'}}>Best Regards,</div>
      <div className={styles.signature}>The CommScope Team</div>
      {/* <div className={styles.contact}>For more information, please contact: <span className={styles.email}>commscope@msdplus.com</span></div> */}
    </div>
    
      {/* <div className={styles.buttonContainer}>
        <button className={styles.downloadButton} onClick={onDownloadCalendar}>
          DOWNLOAD CALENDAR TO LINK
        </button>
        <button className={styles.homeButton} onClick={onBackToHome}>
          BACK TO HOME
        </button>
      </div> */}
    </div>
  );
};
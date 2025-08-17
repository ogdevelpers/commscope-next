import styles from '@/app/page.module.css'

export default function Hero() {
  return (
    <>
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
    </>
  )
}

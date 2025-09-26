import styles from '@/app/page.module.css'

export default function Hero() {
  return (
    <>
          <section id="home" className={styles.heroSection}>
            <div>
              <img width="100%" src='/registration_banner.svg' alt='1' />
            </div>
            <div>
              <img width="100%" src='/registration_band.svg' alt='2' />
            </div>
        {/* <div className={styles.heroContentContainer}>
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
            <div><img src='./heroAsset.svg' alt='1' />  29th Sept - 2nd Oct, 2025</div>

            <div><img src='./heroAsset2.svg' alt='2'/> The Peninsula, Bangkok - Thailand</div>
          </div>
        </div> */}
      </section>
    </>
  )
}

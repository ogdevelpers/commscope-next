import styles from './itenarybox.module.css' 

export default function ItenaryListBox() {
  return (  
    <section className={styles.itenaryComponent}>
        <div className={styles.itenaryBox}>
          <div className={styles.itenaryPunchBox}>
            {[1,2,3,4].map(()=>{
                    return (
                        <>
                            <ItenaryPunch/>
                        </>
                    )
                }
            )}
          </div>

          <div className={styles.itenaryListBox}>

          </div>
        </div>
    </section>
  )
}


const ItenaryPunch = ()=>{
    return (
        <>
            <div className={styles.itenaryPunchItem}>
                <div className={styles.itenaryPunchDate}>
                    29th Sep, 2025
                </div>

                <div className={styles.itenaryPunchDetails}>
                    <div className={styles.itenaryPunchDay}>
                        Day 1
                    </div>
                    <div className={styles.itenaryPunchTitle}>Arrival & Welcome</div>
                </div>
            </div>
        </>
    )
}
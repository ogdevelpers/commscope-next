import styles from './itenarybox.module.css'

export default function ItenaryListBox() {
    return (
        <section className={styles.itenaryComponent}>
            <div className={styles.itenaryBox}>
                <div className={styles.itenaryPunchBox}>
                    {[1, 2, 3, 4].map((item, index) => {
                        return (
                            <div className={styles.itenaryPunchKaBox} key={index}>
                                <ItenaryPunch active={item===1}/>
                            </div>
                        )
                    }
                    )}
                </div>

                <div className={styles.itenaryListBox}>
                    {
                        [1, 2].map((item, index) => {
                            return (
                                <div key={index}> 
                                        <ItenaryListItem /> 
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

const ItenaryPunch = ({ active }: { active: boolean }) => {
    return (
        <div className={`${styles.itenaryPunchItem} ${active ? styles.itenaryPunchItemActive : ''}`}>
            <div className={`${styles.itenaryPunchDate} ${active ? styles.itenaryPunchDateActive : ''}`}>
                29th Sep, 2025
            </div>

            <div className={`${styles.itenaryPunchDetails} ${active ? styles.itenaryPunchDetailsActive : ''}`}>
                <div className={`${styles.itenaryPunchDay} ${active ? styles.itenaryPunchDayActive : ''}`}>
                    Day 1
                </div>
                <div className={`${styles.itenaryPunchTitle} ${active ? styles.itenaryPunchTitleActive : ''}`}>
                    Arrival & Welcome
                </div>
            </div>
        </div>
    )
}


const ItenaryListItem = () => {
    return (
        <div className={styles.itenaryListItemDiv}>
            <span className={styles.itenaryTimeDisplay}>12:00 - 15:00</span>
            <div className={styles.itenaryTimelineLine}></div>
            <span className={styles.itenaryDetails}>Arrival in Bangkok</span>
        </div>
    )
}
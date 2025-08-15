import styles from  './navbar.module.css'

export default function Navbar() {
  return (
    <>
    <nav className={styles.nav}>
        <section className={styles.navLogo}>
            <img src='./logo.svg' alt='Commscope' />
        </section>
        <section className={styles.navLinks}>
            <ul>
                <li>Home</li>
                <li>ABOUT THE EVENT</li>
                <li>AGENDA</li>
                <li>VENUE</li>
                <li>CONTACT</li>
            </ul>
        </section>
        <section className={styles.navRegister}>
            <button className={styles.registerButton}>

            </button>
        </section>
    </nav>
    </>
  )
}

import styles from './footer.module.css'


export default function Footer(){

    return (
        <>
            <footer className={styles.footer}>
                <img src='./logo_footer.svg' alt='logo' />
                <span className={styles.footerUrl}>www.commscope.com</span>
            </footer>
        </>
    )
}
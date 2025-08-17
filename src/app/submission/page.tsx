import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from './submission.module.css'
import Hero from "@/components/Hero/Hero";
import { ThankYouSection } from "@/components/ThankYou/ThankYou";

export default function Page() {
  return (
    <>
    <div className={styles.container}>
      <Navbar />
      <Hero />
       <section className={styles.thankYouSection}>
       < ThankYouSection name={'NAME'} />
       </section>
      <Footer />
      </div>
    </>
  );
}

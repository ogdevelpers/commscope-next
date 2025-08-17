const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    backgroundColor: '#fff',
    marginTop:'80px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '32px',
    color: '#2c3e50', 
  },
  section: {
    marginBottom: '24px', 
    borderRadius: '8px',
  },
  sectionTitle: { 
    fontWeight: '600',
    color: '#2c3e50', 
    display: 'inline-block'
  },
  sectionContent: {
    fontSize: '16px',
    color: '#555',
    marginTop: '8px',
    textAlign: 'justify' as const
  },
  highlight: {
    fontWeight: '600',
    color: '#2c3e50'
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

interface TermsAndConditionsProps {
  className?: string;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ className }) => {
  return (
    <div className={className} style={styles.container}>
      <h1 style={styles.title}>Terms and Conditions</h1>

      <section style={styles.section}>
        <p style={styles.sectionContent}>
          <strong style={styles.sectionTitle}>Extension to stay:</strong>
          If you wish to extend your stay during the Technology Forum, please note that the additional cost will
          be at your own expense and must be confirmed and paid in advance to secure the room reservation. Kindly be aware that
          we cannot guarantee room availability and will not be responsible for any arrangements related to personal trips.
        </p>
      </section>

      <section style={styles.section}>
        <p style={styles.sectionContent}>
          <strong style={styles.sectionTitle}>Visa Requirements:</strong>
          Please note that visa arrangements are the sole responsibility of the participants. We do not facilitate
          visa applications. For more information and guidance on visa requirements, please{' '}
          <span style={styles.link}>
            click here
          </span>.
        </p>
      </section>

      <section style={styles.section}>
        <p style={styles.sectionContent}>
          <strong style={styles.sectionTitle}>Flight Booking:</strong>
          We would like to inform you that all flight arrangements will be managed by <span style={styles.highlight}>CommScope's official travel
          partner, Frosh & Sullivan</span>. To ensure a smooth booking process—especially during this high travel season—we kindly
          request your prompt cooperation in submitting all required travel details as soon as possible. Timely submission will help
          secure optimal flight options and avoid any unnecessary increases in fare due to limited availability.
        </p>
      </section>
    </div>
  );
};
import styles from '../styles/Footer.module.scss';
import DenoflowLogo from '../assets/favicon.svg';
import DenoLogo from '../assets/deno-logo.svg';

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    Powered by
    <a href="https://deno.land" target="_blank" rel="noopener noreferrer">
      <DenoLogo className={styles.denoLogo} />
    </a>{' '}
    and{' '}
    <a
      href="https://github.com/denoflow/denoflow"
      target="_blank"
      rel="noopener noreferrer"
    >
      <DenoflowLogo className={styles.denoLogo} />
    </a>
  </footer>
);

export default Footer;

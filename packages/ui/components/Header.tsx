import { IconButton } from '@material-ui/core';
import { GitHub, Help, WbSunny } from '@material-ui/icons';
import styles from '../styles/Header.module.scss';

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <nav className={styles.navbar}>
      <a href="http://localhost:3000" className={styles.deno}>
        <img src="./deno-logo.svg" alt="Deno Playground" />
        <div className={styles.title}>
          <h1>Deno Playground</h1>
          <h2>Unofficial land for exploring</h2>
        </div>
      </a>

      <div className={styles.placeholder} />

      <IconButton
        className={styles.iconButton}
        aria-label="show GitHub repository"
      >
        <WbSunny fontSize="large" />
      </IconButton>
      <IconButton
        className={styles.iconButton}
        aria-label="show GitHub repository"
        href="https://github.com/peterbartha/deno-playground"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub fontSize="large" />
      </IconButton>
      <IconButton
        className={styles.iconButton}
        aria-label="show GitHub repository"
      >
        <Help fontSize="large" />
      </IconButton>
    </nav>
  </header>
);

export default Header;
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import Link from 'next/link';
import { GitHub, Help } from '@material-ui/icons';
import React from 'react';
import { Alert } from '@material-ui/lab';
import styles from '../styles/Header.module.scss';
import DenoLogo from '../assets/favicon.svg';

const Header = (): JSX.Element => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/">
          <a className={styles.deno}>
            <DenoLogo />
            <div className={styles.title}>
              <h1>Denoflow Playground</h1>
              <h2>An unofficial land for exploring</h2>
            </div>
          </a>
        </Link>

        <div className={styles.placeholder} />

        {/* 
      <IconButton
        className={styles.iconButton}
        aria-label="show GitHub repository"
      >
        <WbSunny fontSize="large" />
      </IconButton>
      */}
        <IconButton
          className={styles.iconButton}
          aria-label="show GitHub repository"
          href="https://github.com/denoflow/denoflow"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub fontSize="large" />
        </IconButton>

        <IconButton
          className={styles.iconButton}
          onClick={openDialog}
          aria-label="show about"
        >
          <Help fontSize="large" />
        </IconButton>
      </nav>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        scroll="paper"
        aria-labelledby="about-title"
        aria-describedby="about-content"
      >
        <DialogTitle id="about-title">About the Playground</DialogTitle>
        <DialogContent dividers>
          <DialogContent id="about-content" tabIndex={-1}>
            <Alert severity="info">
              <em>This is an unofficial playground for Denoflow.</em>
            </Alert>
            <p>
              <strong>
                The playground is an{' '}
                <a
                  href="https://github.com/theowenyoung/denoflow-playground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open source project
                </a>
                . If you have any suggestions for features, issues with the
                implementation, or just want to read the code yourself, you are
                invited to participate!
              </strong>
            </p>
            <p>
              The Denoflow Playground is a web service that runs on Vercel. The
              service receives a TypeScript source code, compiles, runs the
              program with Deno inside a sandbox, and returns the output.
            </p>

            <h4>Abuse handling</h4>
            <p>
              Any requests for content removal should be directed to the{' '}
              <a
                href="https://github.com/theowenyoung/denoflow-playground/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                project's issues
              </a>{' '}
              Please include the URL and the reason for the request.
            </p>
            <h4>Limitations</h4>
            <p>
              Benchmarks will likely not be recommended since the program runs
              in a sandboxed environment with limited resources.
            </p>
            <p>
              Some limitations are enforced to prevent the playground from being
              used to attack other computers and ensure it is available for
              everyone to use:
            </p>
            <ul>
              <li>
                The playground can use most of the standard library, with some
                exceptions. A playground program's only communication to the
                outside world is by writing to standard output and standard
                error.
              </li>
              <li>
                There are also limits on execution time, CPU, and memory usage.
              </li>
            </ul>
            <h4>License</h4>
            <p>
              This project was created by Peter Bartha, and released under{' '}
              <a
                href="https://github.com/theowenyoung/denoflow-playground/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT license
              </a>
              .
            </p>
            <h4>Credits</h4>
            <ul>
              <li>
                This project is forked from{' '}
                <a
                  href="https://github.com/peterbartha/deno-playground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  peterbartha/deno-playground
                </a>
              </li>
              <li>
                Denoflow Docs:{' '}
                <a
                  href="https://github.com/denoflow/denoflow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Denoflow Docs
                </a>
              </li>
            </ul>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;

import React from 'react';
import Link from 'gatsby-link';
import DocSearch from './DocSearch';

import logoImage from './logo.png';
import styles from './header.module.scss';

const githubLink = process.env.GATSBY_GITHUB_LINK;

function Header() {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <Link to="/">
          <img src={logoImage} alt="logo" className="logo" />
        </Link>
      </div>
      <DocSearch />
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <span>GitHub</span>
        </a>
      )}
    </div>
  );
}

export default Header;

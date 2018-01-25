import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'gatsby-link';

import createLinksTree from './createLinksTree';

function NavTree({ headings, navigation, isOpen }) {
  const navTree = createLinksTree(headings);

  return (
    <div className={classNames('toc-wrapper', { open: isOpen })}>
      <div id="toc" className="toc-list-h1">
        {navTree.map(link => (
          <li key={link.to}>
            <a href={link.to} className={classNames('toc-link', 'toc-h1')}>
              {link.value}
            </a>
            {link.children &&
              link.children.length > 0 && (
                <ul className="toc-list-h2">
                  {link.children.map(childLink => (
                    <li key={childLink.to}>
                      <a
                        href={childLink.to}
                        className={classNames('toc-link', 'toc-h2')}
                      >
                        {childLink.value}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </div>
      {navigation &&
        navigation.length > 0 && (
          <ul className="toc-footer">
            {navigation.map(({ path, title }) => (
              <li>
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

NavTree.propTypes = {
  headings: PropTypes.any.isRequired,
  navigation: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default NavTree;

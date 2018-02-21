import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import createLinksTree from './createLinksTree';

function NavigationHeadings({ headings }) {
  const navTree = createLinksTree(headings);

  return (
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
  );
}

NavigationHeadings.propTypes = {
  headings: PropTypes.any.isRequired,
};

export default NavigationHeadings;

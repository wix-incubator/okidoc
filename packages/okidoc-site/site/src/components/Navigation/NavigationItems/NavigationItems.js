import React from 'react';
import PropTypes from 'prop-types';

import Link from 'gatsby-link';

function NavigationItems({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={item.path + '_' + i}>
          {item.path ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            // eslint-disable-next-line
            <a>{item.title}</a>
          )}
          {item.items &&
            item.items.length && <NavigationItems items={item.items} />}
        </li>
      ))}
    </ul>
  );
}

NavigationItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default NavigationItems;

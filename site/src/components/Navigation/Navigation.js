import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import NavButton from './NavButton';
import NavigationHeadings from './NavigationHeadings';
import classNames from 'classnames';
import Link from 'gatsby-link';

const withNavigation = process.env.GATSBY_WITH_NAVIGATION === 'true';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { headings, navigation } = this.props;
    const { isOpen } = this.state;

    return (
      <Fragment>
        <NavButton
          isOpen={isOpen}
          onClick={() => {
            this.setState(({ isOpen }) => ({
              isOpen: !isOpen,
            }));
          }}
        />
        <div className={classNames('toc-wrapper', { open: isOpen })}>
          <NavigationHeadings headings={headings} />
          {withNavigation &&
            navigation &&
            navigation.length > 0 && (
              <ul className="toc-footer">
                {navigation.map(({ path, title }) => (
                  <li key={path}>
                    <Link to={path}>{title}</Link>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </Fragment>
    );
  }
}

Navigation.propTypes = {
  headings: PropTypes.any.isRequired,
  navigation: PropTypes.array.isRequired,
};

export default Navigation;

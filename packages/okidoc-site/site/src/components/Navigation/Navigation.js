import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import NavButton from './NavButton';
import NavigationHeadings from './NavigationHeadings';
import NavigationItems from './NavigationItems';
import classNames from 'classnames';

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
          {navigation &&
            navigation.length > 0 && (
              <div className="toc-footer">
                <NavigationItems items={navigation} />
              </div>
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

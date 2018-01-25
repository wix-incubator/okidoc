import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import NavButton from './NavButton';
import NavTree from './NavTree';

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
        <NavTree headings={headings} navigation={navigation} isOpen={isOpen} />
      </Fragment>
    );
  }
}

Navigation.propTypes = {
  headings: PropTypes.any.isRequired,
  navigation: PropTypes.array.isRequired,
};

export default Navigation;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SiteMetadata from '../components/SiteMetadata';
import Header from '../components/Header';

// import '../assets/stylesheets/print.scss';
import '../assets/stylesheets/screen.scss';

function TemplateWrapper({ children, data }) {
  return (
    <Fragment>
      <SiteMetadata siteMetadata={data.site.siteMetadata} />
      <Header />
      {children()}
    </Fragment>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.any,
};

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`;

export default TemplateWrapper;

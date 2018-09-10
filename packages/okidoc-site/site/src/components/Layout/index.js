import { StaticQuery, graphql } from 'gatsby';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SiteMetadata from '../SiteMetadata';
import Header from '../Header/index';

// import '../assets/stylesheets/print.scss';
import '../../assets/stylesheets/screen.scss';

function TemplateWrapper({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              description
              keywords
            }
          }
        }
      `}
      render={data => (
        <Fragment>
          <SiteMetadata siteMetadata={data.site.siteMetadata} />
          <Header />
          {children}
        </Fragment>
      )}
    />
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.any,
};

export default TemplateWrapper;

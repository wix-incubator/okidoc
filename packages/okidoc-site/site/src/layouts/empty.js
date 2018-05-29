import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SiteMetadata from '../components/SiteMetadata';

function TemplateWrapper({ children, data }) {
  return (
    <Fragment>
      <SiteMetadata siteMetadata={data.site.siteMetadata} />
      {children()}
    </Fragment>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.any,
};

export const query = graphql`
  query EmptyLayoutQuery {
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

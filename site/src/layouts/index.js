import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';

// import '../assets/stylesheets/print.scss';
import '../assets/stylesheets/screen.scss';
import '../assets/stylesheets/prism.scss';

function TemplateWrapper({ children, data }) {
  const { title, description, keywords } = data.site.siteMetadata;

  return (
    <Fragment>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Helmet>
      <Header />
      {children()}
    </Fragment>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
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

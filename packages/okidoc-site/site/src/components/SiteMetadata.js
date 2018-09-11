import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

function SiteMetadata({ siteMetadata }) {
  return (
    <Helmet>
      {siteMetadata.title && <title>{siteMetadata.title}</title>}
      {siteMetadata.description && (
        <meta name="description" content={siteMetadata.description} />
      )}
      {siteMetadata.keywords && (
        <meta name="keywords" content={siteMetadata.keywords} />
      )}
    </Helmet>
  );
}

SiteMetadata.propTypes = {
  siteMetadata: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
  }).isRequired,
};

export default SiteMetadata;

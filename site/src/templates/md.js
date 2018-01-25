import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';
import CatchDemoLinks from '../components/CatchDemoLinks';

function Template({ location, data: { site, page } }) {
  let headings = page.headings;
  let html = page.html;

  const includes = page.frontmatter && page.frontmatter.include;

  if (includes) {
    includes.forEach(({ childMarkdownRemark }) => {
      headings = headings.concat(childMarkdownRemark.headings);
      html += childMarkdownRemark.html;
    });
  }

  return (
    <Fragment>
      <Navigation
        location={location}
        headings={headings}
        navigation={site.siteMetadata.navigation}
      />
      <div className="page-wrapper">
        <div className="dark-box" />
        <CatchDemoLinks>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </CatchDemoLinks>
        <div className="dark-box" />
      </div>
    </Fragment>
  );
}

Template.propTypes = {
  location: PropTypes.any.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        navigation: PropTypes.array.isRequired,
      }),
    }),
    page: PropTypes.shape({
      headings: PropTypes.array.isRequired,
      html: PropTypes.string.isRequired,
    }),
  }),
};

export const siteFragment = graphql`
  fragment mdTemplateSiteFields on Site {
    siteMetadata {
      navigation {
        path
        title
      }
    }
  }
`;

export const markdownFragment = graphql`
  fragment mdTemplateMarkdownFields on MarkdownRemark {
    frontmatter {
      title
      include {
        childMarkdownRemark {
          headings {
            value
            depth
          }
          html
        }
      }
    }
    headings {
      depth
      value
    }
    html
  }
`;

export const query = graphql`
  query MarkdownPage($slug: String!) {
    site {
      ...mdTemplateSiteFields
    }
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...mdTemplateMarkdownFields
    }
  }
`;

export default Template;

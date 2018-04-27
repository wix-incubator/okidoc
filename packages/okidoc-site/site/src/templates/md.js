import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';
import CatchDemoLinks from '../components/CatchDemoLinks';

import '../assets/stylesheets/prism.scss';

const SIMPLE_LAYOUT = 'simple';
const INDEX_PAGE_REQUIRED_MESSAGE = `For site index page create <code>./docs/index.md</code> file`;

function Template({ match, location, data: { site, page } }) {
  if (!page && match.path === '/') {
    page = {
      headings: [],
      html: INDEX_PAGE_REQUIRED_MESSAGE,
    };
  }

  let headings = page.headings;
  let html = page.html;

  const frontMatter = page.frontmatter;
  const includes = frontMatter && frontMatter.include;
  const layout = (frontMatter && frontMatter.layout) || 'two-column';
  const isSimpleLayout = layout === SIMPLE_LAYOUT;

  if (includes) {
    includes.forEach(file => {
      if (!file) {
        console.error(
          `'${
            location.pathname
          }': invalid file path in md front matter 'include' property`,
        );
      }

      if (!file.childMarkdownRemark) {
        console.error(
          `'${
            location.pathname
          }': invalid file in md front matter 'include' property`,
        );
        return;
      }

      const childMarkdownRemark = file.childMarkdownRemark;

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
      <div className={`page-wrapper ${layout}-layout`}>
        {!isSimpleLayout && <div className="dark-box" />}
        <CatchDemoLinks>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </CatchDemoLinks>
        {!isSimpleLayout && <div className="dark-box" />}
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
      layout
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

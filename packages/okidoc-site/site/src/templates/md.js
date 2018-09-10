import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import renderHtmlAst from '../utils/renderHtmlAst';

import Navigation from '../components/Navigation';
import CatchDemoLinks from '../components/CatchDemoLinks';
import Layout from '../components/Layout';

import getPageHeadingsAndHtmlAst from '../utils/getPageHeadingsAndHtmlAst';

import { NAVIGATION, MD_COMPONENTS } from '../config';

import '../assets/stylesheets/prism.scss';

const SIMPLE_LAYOUT = 'simple';

function Template({ match, location, data: { site, page } }) {
  if (!page && match.path === '/') {
    return (
      <div className="page-wrapper">
        For site index page create <code>./docs/index.md</code> file
      </div>
    );
  }

  const { headings, htmlAst } = getPageHeadingsAndHtmlAst(page);

  const layout = (page.frontmatter && page.frontmatter.layout) || 'two-column';
  const isSimpleLayout = layout === SIMPLE_LAYOUT;
  const isSinglenavigationItem =
    (headings && headings.length <= 1) || NAVIGATION.length === 0;

  return (
    <Layout>
      <Navigation
        location={location}
        headings={headings}
        navigation={NAVIGATION}
        isSinglenavigationItem={isSinglenavigationItem}
      />
      <div
        className={classNames(`page-wrapper ${layout}-layout`, {
          'single-navigation': isSinglenavigationItem,
        })}
      >
        {!isSimpleLayout && <div className="dark-box" />}
        <CatchDemoLinks>
          <div className="content">
            {renderHtmlAst(htmlAst, { components: MD_COMPONENTS })}
          </div>
        </CatchDemoLinks>
        {!isSimpleLayout && <div className="dark-box" />}
      </div>
    </Layout>
  );
}

Template.propTypes = {
  location: PropTypes.any.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }),
    page: PropTypes.shape({
      headings: PropTypes.array.isRequired,
      htmlAst: PropTypes.object.isRequired,
    }),
  }),
};

export const siteFragment = graphql`
  fragment mdTemplateSiteFields on Site {
    siteMetadata {
      title
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
          htmlAst
        }
      }
    }
    headings {
      depth
      value
    }
    htmlAst
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

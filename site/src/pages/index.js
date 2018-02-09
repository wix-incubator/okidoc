import MdTemplate from '../templates/md';

// NOTE: use `MdTemplate` as index page template with docs/index.md markdown

export const pageQuery = graphql`
  query IndexPage {
    site {
      ...mdTemplateSiteFields
    }
    page: markdownRemark(fields: { slug: { eq: "/" } }) {
      ...mdTemplateMarkdownFields
    }
  }
`;

export default MdTemplate;

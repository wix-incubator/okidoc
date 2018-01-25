import MdTemplate from '../templates/md';

// NOTE: use `MdTemplate` as index page template with docs/index.md markdown

export const pageQuery = graphql`
  query IndexPage {
    page: markdownRemark(fields: { slug: { eq: "docs/" } }) {
      ...mdTemplateFields
    }
  }
`;

export default MdTemplate;

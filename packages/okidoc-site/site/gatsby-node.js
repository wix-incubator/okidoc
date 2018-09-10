const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const parentNode = getNode(node.parent);

  if (
    node.internal.type === `MarkdownRemark` &&
    parentNode.internal.type === `File`
  ) {
    let slug = createFilePath({ node: parentNode, getNode, basePath: `pages` });

    if (parentNode.sourceInstanceName !== 'docs') {
      slug = `/${parentNode.sourceInstanceName}${slug}`;
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allFile {
        edges {
          node {
            sourceInstanceName
            childMarkdownRemark {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    data.allFile.edges.forEach(({ node }) => {
      if (node.childMarkdownRemark) {
        const markdown = node.childMarkdownRemark;
        // const isDocs = node.sourceInstanceName === 'docs';
        // const templatePath = `./src/templates/${isDocs ? 'docs-md' : 'md'}.js`;
        const templatePath = './src/templates/md.js';

        createPage({
          path: markdown.fields.slug,
          component: path.resolve(templatePath),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: markdown.fields.slug,
          },
        });
      }
    });
  });
};

const JS_PATTERN = /\.jsx?$/;
exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  const { GATSBY_NAVIGATION_PATH, GATSBY_MD_COMPONENTS_PATH } = process.env;
  const includeJS = [];

  if (GATSBY_NAVIGATION_PATH && JS_PATTERN.test(GATSBY_NAVIGATION_PATH)) {
    includeJS.push(GATSBY_NAVIGATION_PATH);
  }

  if (GATSBY_MD_COMPONENTS_PATH && JS_PATTERN.test(GATSBY_MD_COMPONENTS_PATH)) {
    includeJS.push(GATSBY_MD_COMPONENTS_PATH);
  }

  if (includeJS.length) {
    // NOTE: ensure js outside src is processed by js loaders
    actions.setWebpackConfig({
      resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')],
      },
      module: {
        rules: [
          {
            test: JS_PATTERN,
            include: includeJS,
            use: [loaders.js()],
          },
        ],
      },
    });
  }
};

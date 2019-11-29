const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const JS_PATTERN = /\.jsx?$/;

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

function getSiteInnerJSModules() {
  return [
    path.join(__dirname, '/.cache'),
    path.join(__dirname, '/src'),
    path.join(__dirname, '/plugins'),
  ];
}

function getSiteOuterJSModules() {
  const modules = [];
  const { GATSBY_NAVIGATION_PATH, GATSBY_MD_COMPONENTS_PATH } = process.env;

  if (GATSBY_NAVIGATION_PATH && JS_PATTERN.test(GATSBY_NAVIGATION_PATH)) {
    modules.push(GATSBY_NAVIGATION_PATH);
  }

  if (GATSBY_MD_COMPONENTS_PATH && JS_PATTERN.test(GATSBY_MD_COMPONENTS_PATH)) {
    modules.push(GATSBY_MD_COMPONENTS_PATH);
  }

  return modules;
}

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  const includeJS = [
    // gatsby js rule ignores everething inside `/node_modules/` ([1], [2]), but okidoc-site is inside `/node_modules/`
    // [1](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/webpack-utils.js#L314-L316)
    // [2](https://github.com/gatsbyjs/gatsby/issues/2792#issuecomment-361944910)
    ...getSiteInnerJSModules(),
    // ensure js outside src is processed by js loaders
    ...getSiteOuterJSModules(),
  ];

  actions.setWebpackConfig({
    resolve: {
      modules: ['node_modules', path.join(__dirname, '/node_modules')],
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
};

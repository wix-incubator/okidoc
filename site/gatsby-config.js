const site = require('./getSiteConfig');

if (site.config.algoliaApiKey) {
  process.env.GATSBY_ALGOLIA_API_KEY = site.config.algoliaApiKey;
}

// https://www.gatsbyjs.org/docs/gatsby-config/
module.exports = {
  pathPrefix: site.config.pathPrefix,
  siteMetadata: Object.assign({}, site.config.siteMetadata, {
    navigation: site.navigation || [],
  }),
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: site.docsPath,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-external-links',
        ],
      },
    },
  ],
};

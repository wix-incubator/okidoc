const site = require('./getSiteConfig');

// https://www.gatsbyjs.org/docs/gatsby-config/
module.exports = {
  pathPrefix: site.config.pathPrefix,
  siteMetadata: site.config.siteMetadata,
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

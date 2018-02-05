const site = require('./getSiteConfig');

if (site.config.algoliaApiKey) {
  process.env.GATSBY_ALGOLIA_API_KEY = site.config.algoliaApiKey;
}

if (site.config.githubLink) {
  process.env.GATSBY_GITHUB_LINK = site.config.githubLink;
}

if (site.navigation && site.navigation.length) {
  process.env.GATSBY_WITH_NAVIGATION = true;
}

const defaultSiteMetadata = {
  title: '',
  description: '',
  keywords: '',
};

// https://www.gatsbyjs.org/docs/gatsby-config/
module.exports = {
  pathPrefix: site.config.pathPrefix,
  // NOTE: Force graphql schema to add title, description, keywords and navigation fields if they not provided
  // TODO: figure out how to add this fields via gatsby api (https://github.com/gatsbyjs/gatsby/issues/3726)
  siteMetadata: Object.assign(
    {},
    defaultSiteMetadata,
    site.config.siteMetadata,
    {
      navigation: site.navigation || [
        {
          path: '/',
          title: 'Home',
        },
      ],
    },
  ),
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
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
          // TODO: cleanup when issue with links in md resolved
          // https://github.com/gatsbyjs/gatsby/issues/3316
          'gatsby-md-links-fix',
        ],
      },
    },
  ],
};

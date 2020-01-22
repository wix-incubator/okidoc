## Build the documentation site

Site logic is based on [gatsby](https://www.gatsbyjs.org/docs/).

Instead of the default gatsby directory `src/pages`, make sure to **use your docs path** ([example](https://github.com/wix/playable/tree/master/docs)):

```
.
├── site.yml
├── /docs/                      # Site markdown files
│   ├── /index.md               # [required] site index page
│   ├── /other-markdown-file.md
│   └── ...                     # Other markdown files
└── ...
```

> IMPORTANT: Use `index.md` file for the site index page
> ([example](https://github.com/wix/playable/tree/master/docs/index.md)).
> It's a **required** file in your documentation directory.
> Other pages are available by file name without the `.md` extension.

> Only `md` files are served by `okidoc-site`.

### Configure

To configure your site, use the yaml config (default config path is `./site.yml`):

```yaml
# Path for markdown files
# add index.md with content for the site index page
docsPath: ./docs

# [optional] path for the site build. Default is `./site`
distPath: ./sitedist

config:
  # [optional] site metadata (https://www.gatsbyjs.org/docs/gatsby-config/#sitemetadata)
  siteMetadata:
    title: YOUR_DOCUMENTATION_SITE_TITLE
    description: YOUR_DOCUMENTATION_SITE_DESCRIPTION
    keywords: YOUR_DOCUMENTATION_SITE_KEYWORDS
  # [optional] path prefix
  pathPrefix: /my-awesome-lib
  # [optional] algolia apiKey and indexName for docsearch (https://www.algolia.com/ref/docsearch). If empty, search will be hidden
  algoliaApiKey: YOUR_ALGOLIA_API_KEY
  algoliaIndexName: YOUR_ALGOLIA_INDEX_NAME
  # [optional] Link to your github repository
  githubLink: YOUR_GITHUB_REPOSITORY

# [optional] react components inside markdown
mdComponents:
  path: ./docs/playground-components.js

# [optional] navigation config. Use this if you need more than one page in the navigation block
navigation:
  - path: /config
    title: Configuration
  - path: /methods
    title: Methods
```

### Add navigation

[navigation config](/okidoc-site-navigation)

### Add react components

[react components inside markdown](/okidoc-site-md-components)

### Develop/Build

Run the `okidoc-site` script

```sh
$ okidoc-site develop ./site.yml
```

This will launch a hot-reloading development environment accessible at [localhost:8000](http://localhost:8000)

```sh
$ okidoc-site build ./site.yml
```

This will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.

Read on gatsby [docs](https://www.gatsbyjs.org/docs/) for more information

### Deploy

If you use GitHub to host your repository, the easiest way to deploy your site is to use the [gh-pages](https://github.com/tschaub/gh-pages) library:

```json
"scripts": {
  "documentation:site:build": "npm run documentation && okidoc-site build ./site.yml",
  "documentation:site:deploy": "npm run documentation:site:build && gh-pages -d site",
}
```

For more deploy options read the gatsby [docs](https://www.gatsbyjs.org/docs/deploy-gatsby/)

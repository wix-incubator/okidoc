## Build documentation site

Site logic is based on [gatsby](https://www.gatsbyjs.org/docs/).

Instead of default gatsby directory `src/pages`, **use your docs path** ([example](https://github.com/wix/playable/tree/master/docs)):

```
.
├── site.yml
├── /docs/                      # Site markdown files
│   ├── /index.md               # [required] site index page
│   ├── /other-markdown-file.md
│   └── ...                     # Other markdown files
└── ...
```

> IMPORTANT: For site index page use `index.md` file
> ([example](https://github.com/wix/playable/tree/master/docs/index.md)).
> It is **required** file in your documentation directory.
> Other pages are available by file name without `.md` extension.

> Only `md` files are served by `okidoc-site`.

To configure your site, use yaml config (for example `site.yml`):

```yaml
# Markdown files path
# put index.md with content for site index page
docsPath: ./docs

# [optional] path for site build. Default path is `./site`
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

# [optional] navigation config. Use if you need more than one page in navigation block
navigation:
 - path: /config
   title: Configuration
 - path: /methods
   title: Methods
```

Run `okidoc-site` script

```sh
$ okidoc-site develop ./site.yml
```

Site will start a hot-reloading development environment accessible at localhost:8000

```sh
$ okidoc-site build ./site.yml
```

Will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.

Read gatsby [docs](https://www.gatsbyjs.org/docs/) for more information

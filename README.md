# okidoc

Documentation tool

## Installation

Install using the [npm](https://www.npmjs.com/) package manager:

```sh
$ npm install okidoc --save-dev
```

This installs package and put two commands in your `./node_modules/.bin` path:

* `okidoc-md` - generate human-readable documentation `md` files using source code with [JSDoc](http://usejsdoc.org) and public method markers
* `okidoc-site` - run and build documentation site based on `md` files and site config

You can use these commands in your [npm scripts](https://docs.npmjs.com/misc/scripts#examples):

```json
"scripts": {
  "documentation": "okidoc-md ./docs.yml ./docs",
  "documentation:gitadd": "npm run documentation && git add ./docs",
  "documentation:site": "okidoc-site develop ./site.yml",
  "documentation:site:build": "npm run documentation && okidoc-site build ./site.yml",
  "precommit": "npm run documentation:gitadd"
}
```

## Generate documentation

Add `@doc TAG_NAME` tag to [JSDoc](http://usejsdoc.org) of class or class method

```typescript
/**
 * My Super UI
 * @doc UI
 */
class MySuperUI {
  /**
   * show UI
   * @example
   * mySuperUI.show();
   */
  show() {}

  /**
   * hide UI
   */
  hide() {}
}

class MySuperUIEvents {
  /**
   * Add an event listener
   * @param eventName
   * @param fn
   * @doc Events
   */
  on(eventName: string, fn: Function) {}

  /**
   * Remove an event listener
   * @param eventName
   * @param fn
   * @doc Events
   */
  off(eventName: string, fn: Function) {}
}
```

Add yaml config (default config path is `docs.yml`):

```yaml
# Get files using `entry` or/and `glob` (could be `.js` or `.ts` files),
# find api methods by `@doc UI` tag in JSDoc and generate markdown to `partial/ui.md` file.
- path: partial/ui.md
  title: UI API Methods
  # [optional] if provided, only `entry` file dependencies will be parsed
  entry: src/index.ts
  # [optional] required if `entry` not provided
  glob: src/**/*.ts
  # tag name have to match `@doc UI` in JSDoc
  tag: UI

- path: partial/events.md
  title: Events API
  glob: src/**/*.ts
  tag: Events
```

> NOTE: With `entry` option, all dependency file source will be parsed for doc. Not only imported/exported part.

Run `okidoc-md` script

```sh
okidoc-md ./docs.yml ./docs
```

It will generates docs markdown using configuration from `./docs.yml` and put them to `./docs` directory

> NOTE: `./docs.yml` and `./docs` are default values for `configPath` and `outputDir` arguments and can be omitted.
> Run `okidoc-md --help` for help.

## Customize documentation generation

To extract api methods with custom rule use `visitor` prop in `docs.yml` and visitor code:

```yaml
- path: public-methods.md
  title: Public Methods
  glob: src/**/*.js
  visitor: path/to/visitor/myApiVisitor.js
```

```js
// myApiVisitor.js

function createApiVisitor(enter) {
  return {
    Decorator(path) {
      if (isPublicApiDecorator(path.node)) {
        enter(path.parentPath);
      }
    },
  };
}

function createApiMethod(nodeFromVisitor) {
  // return ast of cleaned up method with JSDoc and empty body
}

module.exports = {
  createApiVisitor,
  createApiMethod,
};
```

Main visitor example:

* [createApiVisitor](https://github.com/wix/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiVisitor.js)
* [createApiMethod](https://github.com/wix/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiMethod.js)

Custom visitor example:

* [createApiVisitor](https://github.com/wix/playable/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiVisitor.js)
* [createApiMethod](https://github.com/wix/playable/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiMethod.js)

Read about visitors:

* https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
* https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js

## Markdown files

You can combine auto generated markdown files with manually created. Markdown should be written in [gfm](https://github.github.com/gfm/) format.

Each markdown file can be annotated with YAML front matter. Here is a basic example:

```yaml
---
title: "okidoc"
layout: simple
include:
  - ./partial/api.md
---

# My super API

After this line content from `api.md` will be included.
```

Supported properties:

|    OPTION | VALUE                                                                                                                                                                    |
| --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   `title` | The title for the page in `<title>` tag.                                                                                                                                 |
|  `layout` | Optionally define or override the layout to use. Available layouts: `two-column` - default layout, code examples are shown on right side.. `simple` - one column layout. |
| `include` | List of markdown files that will be included after content in the current markdown file.                                                                                 |

## Build documentation site

Site logic is based on [gatsby](https://www.gatsbyjs.org/docs/).

Instead of default gatsby directory `src/pages`, **use your docs path** ([example](https://github.com/wix/playable/blob/25d9d506c3d640b9cbd614d4e9b476390ada51b9/docs/)):

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
> ([example](https://github.com/wix/playable/blob/25d9d506c3d640b9cbd614d4e9b476390ada51b9/docs/index.md)).
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
# site will start a hot-reloading development environment accessible at localhost:8000
okidoc-site develop ./site.yml

# will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.
okidoc-site build ./site.yml
```

Read gatsby [docs](https://www.gatsbyjs.org/docs/) for more information

## Deploy documentation site

If you use github for your repository, the easiest way to deploy site is to use [gh-pages](https://github.com/tschaub/gh-pages) library:

```json
"scripts": {
  "documentation:site:build": "npm run documentation && okidoc-site build ./site.yml",
  "documentation:site:deploy": "npm run documentation:site:build && gh-pages -d site",
}
```

For more deploy options read gatsby [docs](https://www.gatsbyjs.org/docs/deploy-gatsby/)

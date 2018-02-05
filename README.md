# okidoc

Documentation tool

## Installation

Install using the [npm](https://www.npmjs.com/) package manager:

```sh
$ npm install @wix/okidoc --save-dev
```

This installs package and put two commands in your `./node_modules/.bin` path:

* `okidoc` - generate human-readable documentation `md` files using source code with [JSDoc](http://usejsdoc.org) and public method markers
* `okidoc-site` - run and build documentation site based on `md` files and site config

You can use these commands in your [npm scripts](https://docs.npmjs.com/misc/scripts#examples):

```json
"scripts": {
  "documentation": "okidoc ./docs/docs.yml ./docs",
  "documentation:gitadd": "npm run documentation && git add ./docs",
  "documentation:site": "okidoc-site develop ./docs/site.yml",
  "documentation:site:build": "npm run documentation && okidoc-site build ./docs/site.yml",
  "documentation:site:deploy": "npm run documentation:site:build && gh-pages -d sitedist",
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

Add yaml config (for example `docs.yml`):

```yaml
# get files using `glob` `src/**/*.ts` (could be js or ts files),
# find api methods by `@doc UI` tag in JSDoc
# and generate markdown to `partial/ui.md` file
- path: partial/ui.md
  title: UI API Methods
  glob: src/**/*.ts
  tag: UI

- path: partial/events.md
  title: Events API
  glob: src/**/*.ts
  tag: Events
```

Run `okidoc` script

```sh
# generate markdown docs using configuration from `./docs.yml` and put them to `./docs` directory
okidoc ./docs.yml ./docs
```

### Customization

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

* [createApiVisitor](https://github.com/wix-private/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiVisitor.js)
* [createApiMethod](https://github.com/wix-private/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiMethod.js)

Custom visitor example:

* [createApiVisitor](https://github.com/wix-private/video-player.js/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiVisitor.js)
* [createApiMethod](https://github.com/wix-private/video-player.js/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiMethod.js)

Read about visitors:

* https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
* https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js

## Build documentation site

Site logic is based on [gatsby](https://www.gatsbyjs.org/docs/).
Instead of default gatsby directory `src/pages` use your docs path. Only `md` files are served by `okidoc-site`.

For site index page use `index.md` file
([example](https://github.com/wix-private/wix-vod/blob/6b06510eedc8774d563871d018f5aacdce0b332b/wix-vod-sdk/docs/index.md)).
It is required file in your documentation directory.
Other pages are available by file name without `.md` extension.

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
 # [optional] path prefix
 pathPrefix: /my-awesome-lib
 # [optional] algolia apiKey for docsearch (https://www.algolia.com/ref/docsearch). If empty, search will be hidden
 algoliaApiKey: YOUR_ALGOLIA_API_KEY
 # [optional] Link to your github repository
 githubLink: YOUR_GITHUB_REPOSITORY

# [optional] navigation config. Use if you need more than one page
navigation:
 - path: /player-config
   title: Configuration
 - path: /video-source
   title: Video source
 - path: /api
   title: API reference
 - path: /modules
   title: Modules
 - path: /events
   title: Player events
 - path: /adapters
   title: Playback adapters
```

Run `okidoc-site` script

```sh
# site will start a hot-reloading development environment accessible at localhost:8000
okidoc-site develop ./site.yml

# will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.
okidoc-site build ./site.yml
```

Read gatsby [docs](https://www.gatsbyjs.org/docs/) for more information

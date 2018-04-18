## Deploy documentation site

If you use github for your repository, the easiest way to deploy site is to use [gh-pages](https://github.com/tschaub/gh-pages) library:

```json
"scripts": {
  "documentation:site:build": "npm run documentation && okidoc-site build ./site.yml",
  "documentation:site:deploy": "npm run documentation:site:build && gh-pages -d site",
}
```

For more deploy options read gatsby [docs](https://www.gatsbyjs.org/docs/deploy-gatsby/)

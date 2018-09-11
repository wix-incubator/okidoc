---
title: "okidoc"
layout: simple
include:
  - ./partial/okidoc-md.md
  - ./partial/okidoc-site-files.md
  - ./partial/okidoc-site.md
  - ./partial/okidoc-site-deploy.md
---

# okidoc

Tool to document your code easy and flexible

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

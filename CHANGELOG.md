# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.6](https://github.com/wix/okidoc/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2019-04-23)

### Features

- **okidoc-site:** Redesign 2 column navigation ([cfd6887](https://github.com/wix/okidoc/commit/cfd6887))

# [2.0.0-beta.5](https://github.com/wix/okidoc/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2019-04-22)

### Bug Fixes

- **okidoc-md:** freeze `unist-builder` to `1.0.2` due to changed build result in `1.0.3` ([add6a3e](https://github.com/wix/okidoc/commit/add6a3e))
- **okidoc-md:** use `unist-builder@1.0.2`. ([efd9d46](https://github.com/wix/okidoc/commit/efd9d46))
- **okidoc-md:** [#66](https://github.com/wix/okidoc/issues/66) handle optional method for interface ([0048af6](https://github.com/wix/okidoc/commit/0048af6))
- **okidoc-site:** Fixes rendering for long types ([0439eb6](https://github.com/wix/okidoc/commit/0439eb6)), closes [#34](https://github.com/wix/okidoc/issues/34)
- **okidoc-site:** freezing version of docsearch.js in okidoc-site/site ([270d7cf](https://github.com/wix/okidoc/commit/270d7cf))

<a name="2.0.0-beta.4"></a>

# [2.0.0-beta.4](https://github.com/wix/okidoc/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2018-05-31)

### Bug Fixes

- **okidoc-site:** fix issue with headings with same name on one page ([a4b47a0](https://github.com/wix/okidoc/commit/a4b47a0))

<a name="2.0.0-beta.3"></a>

# [2.0.0-beta.3](https://github.com/wix/okidoc/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-05-30)

### Bug Fixes

- **okidoc-md:** fix issue ts vs flow issue for optional class property ([374c61d](https://github.com/wix/okidoc/commit/374c61d))

<a name="2.0.0-beta.2"></a>

# [2.0.0-beta.2](https://github.com/wix/okidoc/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2018-05-30)

### Bug Fixes

- **okidoc-md:** fix issue ts vs flow issue for optional class property ([2703a07](https://github.com/wix/okidoc/commit/2703a07))
- **okidoc-md:** fix issue with interface trailing JSDoc comments ([b77f417](https://github.com/wix/okidoc/commit/b77f417))

<a name="2.0.0-beta.1"></a>

# [2.0.0-beta.1](https://github.com/wix/okidoc/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-05-14)

### Bug Fixes

- **okidoc-md:** fix issue with optional interface property ts vs flow ([39ddff0](https://github.com/wix/okidoc/commit/39ddff0))

<a name="2.0.0-beta.0"></a>

# [2.0.0-beta.0](https://github.com/wix/okidoc/compare/v1.6.0...v2.0.0-beta.0) (2018-05-01)

### Bug Fixes

- **okidoc-md:** freeze documentationjs version ([0c4e15f](https://github.com/wix/okidoc/commit/0c4e15f)) (due to https://github.com/documentationjs/documentation/issues/1057)
- **okidoc-site:** increase left padding for md heading navigation with depth >= 3 ([f15bd1c](https://github.com/wix/okidoc/commit/f15bd1caeaf97fb508683eb87806e8ae3e4055b8))

### Code Refactoring

- **okidoc-md:** refactor `buildDocumentationSourceAST` logic ([979bf67](https://github.com/wix/okidoc/commit/979bf67))
- **okidoc-md:** refactor visitor api logic ([4901b46](https://github.com/wix/okidoc/commit/4901b46), [d14f534](https://github.com/wix/okidoc/commit/d14f534))

### Features

- **okidoc-md:** improve `@doc` tag visitor warn log ([be85dd7](https://github.com/wix/okidoc/commit/be85dd7))
- **okidoc-md:** render markdown for class and class constructor ([#41](https://github.com/wix/okidoc/pull/41))
- **okidoc-site:** add ability to render react components inside markdown ([#44](https://github.com/wix/okidoc/pull/44))
- **okidoc-site:** add ability to use nested pages navigation ([#45](https://github.com/wix/okidoc/pull/45)), closes [#27](https://github.com/wix/okidoc/issues/27)
- **okidoc-site:** allow to use `okidoc-site` commands without config path param. ([#47](https://github.com/wix/okidoc/pull/47))

### BREAKING CHANGES

- **okidoc-md:** change custom visitor api
- change rendering of documentation for class and class constructor ([#41](https://github.com/wix/okidoc/pull/41))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.0.0-beta.4"></a>
# [2.0.0-beta.4](https://github.com/wix/okidoc/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2018-05-31)




**Note:** Version bump only for package okidoc-md

<a name="2.0.0-beta.3"></a>
# [2.0.0-beta.3](https://github.com/wix/okidoc/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-05-30)


### Bug Fixes

* **okidoc-md:** fix issue ts vs flow issue for optional class property ([374c61d](https://github.com/wix/okidoc/commit/374c61d))




<a name="2.0.0-beta.2"></a>
# [2.0.0-beta.2](https://github.com/wix/okidoc/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2018-05-30)


### Bug Fixes

* **okidoc-md:** fix issue ts vs flow issue for optional class property ([2703a07](https://github.com/wix/okidoc/commit/2703a07))
* **okidoc-md:** fix issue with interface trailing JSDoc comments ([b77f417](https://github.com/wix/okidoc/commit/b77f417))




<a name="2.0.0-beta.1"></a>
# [2.0.0-beta.1](https://github.com/wix/okidoc/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-05-14)


### Bug Fixes

* **okidoc-md:** fix issue with optional interface property ts vs flow ([39ddff0](https://github.com/wix/okidoc/commit/39ddff0))




<a name="2.0.0-beta.0"></a>

# [2.0.0-beta.0](https://github.com/wix/okidoc/compare/v1.6.0...v2.0.0-beta.0) (2018-05-01)

### Bug Fixes

* **okidoc-md:** freeze documentationjs version ([0c4e15f](https://github.com/wix/okidoc/commit/0c4e15f)) (due to https://github.com/documentationjs/documentation/issues/1057)

### Code Refactoring

* **okidoc-md:** refactor `buildDocumentationSourceAST` logic ([979bf67](https://github.com/wix/okidoc/commit/979bf67))
* **okidoc-md:** refactor visitor api logic ([4901b46](https://github.com/wix/okidoc/commit/4901b46), [d14f534](https://github.com/wix/okidoc/commit/d14f534))

### Features

* **okidoc-md:** improve `@doc` tag visitor warn log ([be85dd7](https://github.com/wix/okidoc/commit/be85dd7))
* **okidoc-md:** render markdown for class and class constructor ([#41](https://github.com/wix/okidoc/pull/41))

### BREAKING CHANGES

* **okidoc-md:** change custom visitor api
* change rendering of documentation for class and class constructor ([#41](https://github.com/wix/okidoc/pull/41))

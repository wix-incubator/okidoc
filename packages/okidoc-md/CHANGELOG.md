# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

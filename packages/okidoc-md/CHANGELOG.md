# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.1](https://github.com/wix/okidoc/compare/v2.0.0...v2.0.1) (2020-09-21)

### Bug Fixes

- **okidoc-md:** fix the error on parsing of on generic constraints and conditional types in Typescript ([c2d3b00](https://github.com/wix/okidoc/commit/c2d3b000e2d0d1198a15bf2d6f59f74f9383da71))

# [2.0.0](https://github.com/wix/okidoc/compare/v2.0.0-beta.11...v2.0.0) (2019-12-05)

**Note:** Version bump only for package okidoc-md

# [2.0.0-beta.11](https://github.com/wix/okidoc/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2019-11-29)

### Bug Fixes

- **okidoc-md:** fix issue with error while rendering return type md ([fca1fb5](https://github.com/wix/okidoc/commit/fca1fb50407882e2c8549cb88c8517a6a8c56cdf))

# [2.0.0-beta.9](https://github.com/wix/okidoc/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2019-11-29)

**Note:** Version bump only for package okidoc-md

# [2.0.0-beta.8](https://github.com/wix/okidoc/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2019-11-25)

### Bug Fixes

- **okidoc-md:** fixed parsing code issue with `new` in interface ([ac0c144](https://github.com/wix/okidoc/commit/ac0c144e4ea00ea0032d866f2ba86598cf460b6b)), closes [#59](https://github.com/wix/okidoc/issues/59)

### Chore

- **okidoc-md:** migrated from babylon to @babel/parser ([0ebcd27](https://github.com/wix/okidoc/commit/0ebcd271236bd595ed0ff06a7b9dca0235c442f0)), closes [#70](https://github.com/wix/okidoc/issues/70)
- **okidoc-md:** bump babel ([968d220](https://github.com/wix/okidoc/commit/968d2205e86609085238d0bbdc1a996374afdc57))

# [2.0.0-beta.7](https://github.com/wix/okidoc/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2019-06-06)

### Features

- **okidoc-site:** Update styling for code ([177a40c](https://github.com/wix/okidoc/commit/177a40c))

# [2.0.0-beta.5](https://github.com/wix/okidoc/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2019-04-22)

### Bug Fixes

- **okidoc-md:** freeze `unist-builder` to `1.0.2` due to changed build result in `1.0.3` ([add6a3e](https://github.com/wix/okidoc/commit/add6a3e))
- **okidoc-md:** use `unist-builder@1.0.2`. ([efd9d46](https://github.com/wix/okidoc/commit/efd9d46))
- **okidoc-md:** [#66](https://github.com/wix/okidoc/issues/66) handle optional method for interface ([0048af6](https://github.com/wix/okidoc/commit/0048af6))
- **okidoc-site:** Fixes rendering for long types ([0439eb6](https://github.com/wix/okidoc/commit/0439eb6)), closes [#34](https://github.com/wix/okidoc/issues/34)

<a name="2.0.0-beta.4"></a>

# [2.0.0-beta.4](https://github.com/wix/okidoc/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2018-05-31)

**Note:** Version bump only for package okidoc-md

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

### Code Refactoring

- **okidoc-md:** refactor `buildDocumentationSourceAST` logic ([979bf67](https://github.com/wix/okidoc/commit/979bf67))
- **okidoc-md:** refactor visitor api logic ([4901b46](https://github.com/wix/okidoc/commit/4901b46), [d14f534](https://github.com/wix/okidoc/commit/d14f534))

### Features

- **okidoc-md:** improve `@doc` tag visitor warn log ([be85dd7](https://github.com/wix/okidoc/commit/be85dd7))
- **okidoc-md:** render markdown for class and class constructor ([#41](https://github.com/wix/okidoc/pull/41))

### BREAKING CHANGES

- **okidoc-md:** change custom visitor api
- change rendering of documentation for class and class constructor ([#41](https://github.com/wix/okidoc/pull/41))

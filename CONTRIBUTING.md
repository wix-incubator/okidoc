# Contributing to okidoc

## Tests

To run tests for projects, use `npm run test` from root project.

## Commit Message Guidelines

We use [conventionalcommits](https://conventionalcommits.org) to format our commit messages. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to generate the [okidoc release notes](https://github.com/wix/okidoc/releases).

## Release New Version

To release new version:
- checkout latest master version:
```bash
> git checkout master
> git pull
```
- run [`npm preparePublish`](https://github.com/wix/okidoc/blob/9a39e92822da4cb78d81ca8103689ccd27bad139/package.json#L15) from repo root (based on [`lerna version`](https://github.com/lerna/lerna/tree/master/commands/version)):
```bash
> npm run preparePublish
```
- ensure changelog generated correctly and commit changes if any.
- push master branch and tags:
```bash
> git push origin master
> git push origin [NEW_VERSION_TAG]
```
- draft a new [release on github](https://github.com/wix/playable/releases) with changelog from previous steps
- after CI released new package, publish [release on github](https://github.com/wix/playable/releases)

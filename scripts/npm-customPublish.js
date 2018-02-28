// customPublish script for ci
// before customPublish, packages should be prepared by npm run preparePublish

if (!process.env.IS_BUILD_AGENT) {
  console.log(
    "Package will not be published because we're not running in a CI build agent",
  );
  return process.exit(0);
}

const lernaCLI = require('lerna/lib/cli');
const semver = require('semver');

const lernaJSON = require('../lerna');

// NOTE: lerna publish is not supported on CI due to https://github.com/lerna/lerna/issues/627

// https://github.com/lerna/lerna/blob/2.x/bin/lerna.js
// https://github.com/lerna/lerna#exec
const argv = ['exec', '--concurrency', '1', '--', 'npm', 'publish'];

if (semver.prerelease(lernaJSON.version) !== null) {
  argv.push('--tag=next');
}

lernaCLI().parse(argv);

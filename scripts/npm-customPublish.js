// customPublish script for
// https://github.com/wix-private/wix-ci/blob/master/ci-scripts/wix-agent-scripts/src/npmBuild.sh#L78-L85
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

// NOTE: new version is in packages and git, but not in npm repo. Without `--force-publish` lerna will skip publishing

// https://github.com/lerna/lerna/blob/2.x/bin/lerna.js
// https://github.com/lerna/lerna#publish
const argv = [
  'publish',
  '--skip-git',
  '--force-publish',
  '--repo-version',
  lernaJSON.version,
  '--yes',
];

if (semver.prerelease(lernaJSON.version) !== null) {
  argv.push('--npm-tag=next');
}

lernaCLI().parse(argv);

// NOTE: customPublish script is for ci

if (!process.env.IS_BUILD_AGENT) {
  console.log(
    "Package will not be published because we're not running in a CI build agent",
  );
  return process.exit(0);
}

const lernaCLI = require('lerna/lib/cli');

// NOTE: lerna publish is not supported on CI due to https://github.com/lerna/lerna/issues/627
// NOTE: npm-ci-script

// https://github.com/lerna/lerna/blob/2.x/bin/lerna.js
// https://github.com/lerna/lerna#exec
lernaCLI().parse(['exec', '--concurrency', '1', '--', 'npm-ci', 'publish']);

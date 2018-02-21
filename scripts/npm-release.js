if (!process.env.IS_BUILD_AGENT) {
  console.log(
    "Package will not be published because we're not running in a CI build agent",
  );
  return process.exit(0);
}

const util = require('util');
const path = require('path');
const semver = require('semver');
const exec = util.promisify(require('child_process').exec);
const writeFile = util.promisify(require('fs').writeFile);

const ZERO_VERSION = '0.0.0';

function getPublishedVersion() {
  return exec('npm view okidoc version --registry=https://registry.npmjs.org/')
    .then(result => result.stdout && result.stdout.trim())
    .catch(e => {
      if (e.stderr.startsWith('npm ERR! code E404')) {
        console.log('ERROR: package not found. Possibly not published yet', e);
        return ZERO_VERSION;
      }

      console.log('ERROR: Unable to get published version from npmjs.org', e);
    });
}

function shouldPublish(localVersion, publishedVersion) {
  return (
    publishedVersion === ZERO_VERSION ||
    (!!publishedVersion && semver.gt(localVersion, publishedVersion))
  );
}

function stringify(data) {
  return JSON.stringify(data, null, 2);
}

getPublishedVersion()
  .then(publishedVersion => {
    const packageJSONPath = path.resolve(__dirname, '..', 'package.json');
    const packageJSON = require(packageJSONPath);
    const lernaJSON = require('../lerna.json');

    if (shouldPublish(lernaJSON.version, publishedVersion)) {
      // NOTE: use `private: false` to allow publish to npm
      // https://github.com/wix-private/wix-ci/blob/master/ci-scripts/wix-agent-scripts/src/npmBuild.sh#L72
      return writeFile(
        packageJSONPath,
        stringify(Object.assign({}, packageJSON, { private: false })),
      ).then(() => {
        if (publishedVersion !== ZERO_VERSION) {
          console.log(
            `Version set in lerna.json ${
              lernaJSON.version
            } is newer than published ${publishedVersion}`,
          );
        }

        console.log(`Packages will be published`);
      });
    } else {
      console.log(`Package will not be published`);
      if (publishedVersion) {
        console.log(
          `version ${lernaJSON.version} set in lerna.json is already published`,
        );
      }
    }
  })
  .catch(error => {
    console.error('ERROR: Unable to publish', error);
    process.exit(1);
  });

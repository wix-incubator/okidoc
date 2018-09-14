import path from 'path';
import fs from 'fs-extra';
import tempy from 'tempy';

// NOTE: inspired by https://github.com/wix/haste/blob/v0.3.1/packages/haste-test-utils-core/src/fs-setup.js

/**
 * Setup temp directory with test utils
 * @param {Object} fsObject
 *
 * @example
 *
 * const testFS = setupFS({
 *   'src/constants.ts': 'export const X = 1;'
 *   'src/index.ts': 'import { X } from './constants'
 * })
 *
 * console.log(testFS.cwd)
 * // /path/to/temp/directory
 *
 * console.log(testFS.files['src/index.ts'].path)
 * // /path/to/temp/directory/src/index.ts
 */
function setupFS(fsObject = {}) {
  const cwd = tempy.directory();

  Object.keys(fsObject).forEach(fileName => {
    fs.outputFileSync(path.join(cwd, fileName), fsObject[fileName]);
  });

  const createFileProxy = fileName => {
    return new Proxy(
      {},
      {
        get(target, prop) {
          const filePath = path.join(cwd, fileName);

          switch (prop) {
            case 'content':
              return fs.readFileSync(filePath, 'utf8');

            case 'exists':
              return fs.existsSync(filePath);

            case 'path':
              return filePath;

            case 'write':
              return content => fs.outputFileSync(filePath, content);

            default:
              return undefined;
          }
        },
      },
    );
  };

  const files = new Proxy(
    {},
    {
      get: (target, fileName) => createFileProxy(fileName),
    },
  );

  return {
    cwd,
    files,
  };
}

function fromFixture(fixturesDir, fixtureFileName) {
  return fs.readFileSync(path.join(fixturesDir, fixtureFileName), 'utf8');
}

/**
 * @param {string} fixturesDir
 * @param {string[]} fixturesFileNames
 *
 * @example
 *
 * setupFS(fromFixtures('/path/to/fixtures', [
 *  '/src/index.ts',
 *  '/docs.yml'
 * ]))
 */
function fromFixtures(fixturesDir, fixturesFileNames) {
  return fixturesFileNames.reduce((fsObject, fileName) => {
    fsObject[fileName] = fromFixture(fixturesDir, fileName);

    return fsObject;
  }, {});
}

/**
 * @param {string} fixturesDir
 * @param {Object} fixturesMap
 *
 * @example
 *
 * setupFS(fromFixtures('/path/to/fixtures', {
 *   'src/index.ts': 'src/invalid-index.ts',
 *   'docs.yml': 'src/docs.yml'
 * }))
 */
function fromFixturesMap(fixturesDir, fixturesMap) {
  return Object.keys(fixturesMap).reduce((fsObject, fileName) => {
    fsObject[fileName] = fromFixture(fixturesDir, fsObject[fileName]);

    return fsObject;
  }, {});
}

export { fromFixture, fromFixtures, fromFixturesMap };

export default setupFS;

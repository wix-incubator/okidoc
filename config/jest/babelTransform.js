const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  // NOTE: babel 7 uses different approach with .babelrc file loading
  // so force it to look .babelrc on every monorepo package
  // https://babeljs.io/docs/en/next/config-files#6x-vs-7x-babelrc-loading
  // https://babeljs.io/docs/en/next/options#babelrcroots
  babelrcRoots: [
    // Keep the root as a root
    '.',

    // Also consider monorepo packages "root" and load their .babelrc files.
    './packages/*',
  ],
});

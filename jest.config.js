module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.js$': '<rootDir>/config/jest/babelTransform.js',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/packages/okidoc-md/lib/',
    '/packages/okidoc-site/site/',
    '/fixtures/',
  ],
  collectCoverageFrom: [
    'packages/okidoc-md/src/buildDocumentationSource/**/*.js',
    'packages/okidoc-md/src/buildMarkdown/**/*.js',
  ],
};

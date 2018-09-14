const config = {
  projects: [
    {
      displayName: 'okidoc-md',
      testEnvironment: 'node',
      transform: {
        '\\.js$': '<rootDir>/config/jest/babelTransform.js',
      },
      testMatch: [
        '<rootDir>/packages/okidoc-md/**/__tests__/**/*.js?(x)',
        '<rootDir>/packages/okidoc-md/**/?(*.)+(spec|test).js?(x)',
      ],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/packages/okidoc-md/lib/',
        '/fixtures/',
      ],
      collectCoverageFrom: [
        'packages/okidoc-md/src/buildDocumentationSource/**/*.js',
        'packages/okidoc-md/src/buildMarkdown/**/*.js',
      ],
    },
    // workaround for https://github.com/facebook/jest/issues/5866
    {
      displayName: 'dummy',
      testMatch: ['dummy'],
    },
  ],
};

if (process.env.TEST_E2E || process.env.IS_BUILD_AGENT) {
  config.globalSetup = 'jest-environment-puppeteer/setup';
  config.globalTeardown = 'jest-environment-puppeteer/teardown';
  config.projects.push({
    displayName: 'okidoc-site-e2e',
    testEnvironment: 'jest-environment-puppeteer',
    testMatch: ['<rootDir>/packages/okidoc-site/test/e2e/**/*.e2e.js'],
  });
}

module.exports = config;

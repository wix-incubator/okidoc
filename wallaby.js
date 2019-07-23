module.exports = function() {
  return {
    files: [
      { pattern: './jest.config.js', instrument: false },
      { pattern: './config/jest/babelTransform.js', instrument: false },
      { pattern: 'packages/**/.babelrc', instrument: false },
      'packages/**/src/**/*.js',
      'packages/**/src/**/*.ts',
      '!packages/**/node_modules/**',
      '!packages/okidoc-site/site/**',
      '!packages/**/*.spec.js',
    ],
    tests: ['packages/*/src/**/*.spec.js'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
  };
};

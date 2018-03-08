module.exports = function(wallaby) {
  return {
    files: [
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
    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
    setup: function(wallaby) {
      const jestConfig = require('./package.json').jest;

      wallaby.testFramework.configure(jestConfig);
    },
  };
};

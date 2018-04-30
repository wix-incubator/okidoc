#!/usr/bin/env node

const program = require('caporal');
const pkg = require('../package.json');

const runCLI = require('../cli');

const DEFAULT_CONFIG_PATH = './site.yml';

program
  .version(pkg.version)
  .description('okidoc-site')
  .command(
    'develop',
    `Start development server. Watches files, rebuilds, and hot reloads if something changes`,
  )
  .argument(
    '[configPath]',
    'Config file path',
    program.STRING,
    DEFAULT_CONFIG_PATH,
  )
  .action(({ configPath }, {}, logger) => {
    runCLI('develop', { configPath }, logger);
  })
  .command('build', `Build a Gatsby project`)
  .argument(
    '[configPath]',
    'Config file path',
    program.STRING,
    DEFAULT_CONFIG_PATH,
  )
  .action(({ configPath }, {}, logger) => {
    runCLI('build', { configPath }, logger);
  });

program.parse(process.argv);

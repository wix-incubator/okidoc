#!/usr/bin/env node

const program = require('caporal');

const pkg = require('../package.json');

const runCLI = require('../lib/cli').default;

program
  .version(pkg.version)
  .description('okidoc-md')
  .argument('[configPath]', 'Config file path', program.STRING, './docs.yml')
  .argument('[outputDir]', 'Markdown output dir', program.STRING, './docs')
  .option('-c --config <configPath>', 'Config file path', program.STRING)
  .option('-o --output <outputDir>', 'Markdown output base dir', program.STRING)
  .action((args, options) => {
    runCLI({
      configPath: options.config || args.configPath,
      outputDir: options.output || args.outputDir,
    }).catch(error => {
      console.error('An error occurred while building documentation.', error);
      process.exit(1);
    });
  });

program.parse(process.argv);

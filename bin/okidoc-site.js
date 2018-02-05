#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const yaml = require('yamljs');
const spawn = require('cross-spawn');
const copy = require('ncp').ncp;

// NOTE: ignore first 2 arguments (node and path of this file)
const [command, siteYamlPath] = process.argv.slice(2);

const ALLOWED_COMMANDS = ['build', 'develop'];
const SITE_PATH = path.join(__dirname, '../site');
const RUN_EXAMPLE = `
  example:
    '> okidoc-site ${ALLOWED_COMMANDS[0]} ./path/to/site.yml'
`;

if (!command || !ALLOWED_COMMANDS.includes(command)) {
  throw new Error(
    `'command' should be one of ${JSON.stringify(ALLOWED_COMMANDS)}.
    ${RUN_EXAMPLE}`,
  );
}

if (!siteYamlPath) {
  throw new Error(
    `'okidoc-site' config parameter not provided.
    ${RUN_EXAMPLE}`,
  );
}

if (!fs.existsSync(siteYamlPath)) {
  throw new Error(
    `site yaml path should be valid path.
    '${siteYamlPath}' is not exists.
    ${RUN_EXAMPLE}`,
  );
}

const site = yaml.load(siteYamlPath);
const SITE_DIST_PATH = path.resolve(site.distPath || './site');

const siteCommand = spawn('npm', ['run', command], {
  cwd: SITE_PATH,
  stdio: 'inherit',
  env: {
    ...process.env,
    SITE_CWD: process.cwd(),
    SITE_YAML_PATH: path.resolve(siteYamlPath),
  },
});

if (command === 'build') {
  siteCommand.on('close', code => {
    // NOTE: only success build should be copied
    if (code !== 0) {
      return;
    }

    // NOTE: cleanup prev build version
    spawn.sync('rm', ['-rf', SITE_DIST_PATH], { stdio: 'inherit' });

    copy(path.join(SITE_PATH, 'public'), SITE_DIST_PATH, err => {
      if (!err) {
        console.log(`open '${SITE_DIST_PATH}' to browse site build`);
      }
    });
  });
}

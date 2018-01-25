#!/usr/bin/env node

const path = require('path');
const spawn = require('cross-spawn');
const copy = require('ncp').ncp;

// NOTE: ignore first 2 arguments (node and path of this file)
const [command, siteYamlPath] = process.argv.slice(2);

const ALLOWED_COMMANDS = ['build', 'develop'];
const SITE_PATH = path.join(__dirname, '../site');
// TODO: add ability to configure SITE_DIST_PATH
const SITE_DIST_PATH = path.resolve('./site');
const RUN_EXAMPLE = `okidoc-site ${ALLOWED_COMMANDS[0]} ./path/to/site.yml`;

if (!command || !ALLOWED_COMMANDS.includes(command)) {
  throw new Error(`
    'command' should be one of ${JSON.stringify(ALLOWED_COMMANDS)}.
    example:
    '> ${RUN_EXAMPLE}'
  `);
}

if (!siteYamlPath) {
  throw new Error(`
    'okidoc-site' config parameter not provided
    example:
    '> ${RUN_EXAMPLE}'
  `);
}

const site = spawn('npm', ['run', command], {
  cwd: SITE_PATH,
  stdio: 'inherit',
  env: {
    ...process.env,
    SITE_CWD: process.cwd(),
    SITE_YAML_PATH: path.resolve(siteYamlPath),
  },
});

if (command === 'build') {
  site.on('close', code => {
    // NOTE: only success build should be copied
    if (code !== 0) {
      return;
    }

    copy(path.join(SITE_PATH, 'public'), SITE_DIST_PATH, err => {
      if (!err) {
        console.log(`open '${SITE_DIST_PATH}' to browse site build`);
      }
    });
  });
}

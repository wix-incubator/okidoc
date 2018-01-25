#!/usr/bin/env node

const path = require('path');
const spawn = require('cross-spawn');

// NOTE: ignore first 2 arguments (node and path of this file)
const [command, siteYamlPath] = process.argv.slice(2);

// TODO: check `command`

spawn('npm', ['run', command || 'develop'], {
  cwd: path.join(__dirname, '../site'),
  stdio: 'inherit',
  env: {
    ...process.env,
    SITE_CWD: process.cwd(),
    SITE_YAML_PATH: path.resolve(siteYamlPath),
  },
});

const path = require('path');
const yaml = require('yamljs');
const spawn = require('cross-spawn');
const copy = require('ncp').ncp;

function clean(directoryPath) {
  spawn.sync('rm', ['-rf', directoryPath], { stdio: 'inherit' });
}

function runCLI(command, { configPath }, logger) {
  let site;

  try {
    site = yaml.load(configPath);
  } catch (e) {
    logger.error(
      `Could not parse config file ('${configPath}'):\n ${e.message}`,
    );
    return;
  }

  const SITE_PATH = path.join(__dirname, './site');
  const SITE_DIST_PATH = path.resolve(site.distPath || './site');

  const siteCommand = spawn('npm', ['run', command], {
    cwd: SITE_PATH,
    stdio: 'inherit',
    env: {
      ...process.env,
      SITE_CWD: process.cwd(),
      SITE_YAML_PATH: path.resolve(configPath),
    },
  });

  if (command === 'build') {
    siteCommand.on('close', code => {
      // NOTE: only success build should be copied
      if (code !== 0) {
        return;
      }

      // NOTE: cleanup prev build version
      clean(SITE_DIST_PATH);

      copy(path.join(SITE_PATH, 'public'), SITE_DIST_PATH, err => {
        if (!err) {
          logger.log(`open '${SITE_DIST_PATH}' to browse site build`);
        }
      });
    });
  }
}

module.exports = runCLI;

const fs = require('fs');
const yaml = require('yamljs');
const Joi = require('joi');

const configSchema = require('./config/configSchema');

const prepareDocsPath = require('./config/prepareDocsPath');
const prepareMdComponents = require('./config/prepareMdComponents');
const prepareNavigation = require('./config/prepareNavigation');

function getEnvVariables(env) {
  const { SITE_CWD, SITE_YAML_PATH } = env;

  if (!SITE_CWD || !SITE_YAML_PATH) {
    throw new Error(`
    'SITE_CWD' && 'SITE_YAML_PATH' variables should be in 'process.env'.
    You should run this script via 'okidoc-site'
  `);
  }

  if (!fs.existsSync(SITE_CWD)) {
    throw new Error(
      `'SITE_CWD' should be valid path. '${SITE_CWD}' is not exists`,
    );
  }

  if (!fs.existsSync(SITE_YAML_PATH)) {
    throw new Error(
      `'SITE_YAML_PATH' should be valid path. '${SITE_YAML_PATH}' is not exists`,
    );
  }

  return { SITE_CWD, SITE_YAML_PATH };
}

function getConfig(configPath) {
  try {
    const config = yaml.load(configPath);

    Joi.assert(
      config,
      configSchema,
      `Invalid site config yaml file (${configPath}).`,
    );

    return config;
  } catch (e) {
    throw new Error(`Invalid site config yaml file (${configPath})`);
  }
}

const { SITE_YAML_PATH, SITE_CWD } = getEnvVariables(process.env);
const config = getConfig(SITE_YAML_PATH);

prepareDocsPath(config, { SITE_CWD });
prepareMdComponents(config, { SITE_CWD });
prepareNavigation(config, { SITE_CWD });

module.exports = config;

const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const Joi = require('joi');

const configSchema = {
  docsPath: Joi.string().required(),
  distPath: Joi.string(),
  config: Joi.object({
    siteMetadata: Joi.object(),
    pathPrefix: Joi.string(),
    algoliaApiKey: Joi.string(),
    algoliaIndexName: Joi.string(),
    githubLink: Joi.string(),
  }),
  navigation: Joi.array().items(
    Joi.object({
      path: Joi.string().required(),
      title: Joi.string().required(),
    }),
  ),
};

function checkProcessEnv(env) {
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
}

function getConfig(configPath) {
  try {
    return yaml.load(configPath);
  } catch (e) {
    throw new Error(`Invalid site config yaml file (${configPath})`);
  }
}

checkProcessEnv(process.env);

const { SITE_YAML_PATH, SITE_CWD } = process.env;
const site = getConfig(SITE_YAML_PATH);

Joi.assert(
  site,
  configSchema,
  `Invalid site config yaml file (${SITE_YAML_PATH}).`,
);

site.docsPath = path.join(SITE_CWD, site.docsPath);

module.exports = site;

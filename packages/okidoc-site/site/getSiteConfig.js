const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const Joi = require('joi');

const navigationItemSchema = Joi.object({
  path: Joi.string().when('items', {
    is: Joi.array().min(1),
    otherwise: Joi.string().required(),
  }),
  title: Joi.string().required(),
  items: Joi.array().items(Joi.lazy(() => navigationItemSchema)),
});

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
  mdComponents: Joi.object({
    path: Joi.string().required(),
    externalStyles: Joi.array().items(Joi.string()),
    externalScripts: Joi.array().items(Joi.string()),
  }),
  navigation: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(navigationItemSchema),
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

function resolveExistingPath(cwd, _path) {
  _path = path.join(cwd, _path);

  if (!fs.existsSync(_path)) {
    throw Error(`path "${_path}" not exists`);
  }

  return _path;
}

checkProcessEnv(process.env);

const { SITE_YAML_PATH, SITE_CWD } = process.env;
const site = getConfig(SITE_YAML_PATH);

Joi.assert(
  site,
  configSchema,
  `Invalid site config yaml file (${SITE_YAML_PATH}).`,
);

site.docsPath = resolveExistingPath(SITE_CWD, site.docsPath);

if (site.mdComponents) {
  site.mdComponents.path = resolveExistingPath(
    SITE_CWD,
    site.mdComponents.path,
  );
}

if (site.navigation) {
  const navigationData = site.navigation;
  let navigationPath;

  if (typeof navigationData === 'string') {
    navigationPath = resolveExistingPath(SITE_CWD, navigationData);
  } else if (Array.isArray(navigationData) && navigationData.length) {
    navigationPath = path.resolve(__dirname, './src/__navigation.json');

    fs.writeFileSync(navigationPath, JSON.stringify(navigationData));
  }

  site.navigation = navigationPath;
}

module.exports = site;

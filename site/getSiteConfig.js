const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');

const { SITE_CWD, SITE_YAML_PATH } = process.env;

const REQUIRED_CONFIG_PROPS = ['docsPath', 'config', 'navigation'];

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

let site;

try {
  site = yaml.load(SITE_YAML_PATH);
} catch (e) {
  throw new Error(`Invalid site config yaml file (${SITE_YAML_PATH})`);
}

// TODO: mb use `PropTypes.checkPropTypes`?
if (!site || REQUIRED_CONFIG_PROPS.some(prop => !site.hasOwnProperty(prop))) {
  throw new Error(`
    Invalid site config yaml file (${SITE_YAML_PATH}).
    Required fields: ${JSON.stringify(REQUIRED_CONFIG_PROPS)}
  `);
}

site.docsPath = path.join(SITE_CWD, site.docsPath);

module.exports = site;

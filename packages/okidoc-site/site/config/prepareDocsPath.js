const resolveExistingPath = require('./resolveExistingPath');

function prepareDocsPath(config, { SITE_CWD }) {
  config.docsPath = resolveExistingPath(SITE_CWD, config.docsPath);
}

module.exports = prepareDocsPath;

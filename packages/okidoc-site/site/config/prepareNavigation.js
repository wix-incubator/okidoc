const path = require('path');
const fs = require('fs');

const resolveExistingPath = require('./resolveExistingPath');

function prepareNavigation(config, { SITE_CWD }) {
  if (typeof config.navigation === 'string') {
    config.navigation = resolveExistingPath(SITE_CWD, config.navigation);

    return;
  }

  const navigationPath = path.resolve(__dirname, './__tmp_navigation.json');
  const navigationData = Array.isArray(config.navigation)
    ? config.navigation
    : [];

  fs.writeFileSync(navigationPath, JSON.stringify(navigationData));

  config.navigation = navigationPath;
}

module.exports = prepareNavigation;

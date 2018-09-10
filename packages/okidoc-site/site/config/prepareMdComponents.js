const path = require('path');
const fs = require('fs');

const resolveExistingPath = require('./resolveExistingPath');

function prepareMdComponents(config, { SITE_CWD }) {
  if (config.mdComponents) {
    config.mdComponents.path = resolveExistingPath(
      SITE_CWD,
      config.mdComponents.path,
    );

    return;
  }

  const mdComponentsPath = path.resolve(__dirname, './__tmp_mdComponents.json');

  fs.writeFileSync(mdComponentsPath, JSON.stringify({}));

  config.mdComponents = {
    path: mdComponentsPath,
  };
}

module.exports = prepareMdComponents;

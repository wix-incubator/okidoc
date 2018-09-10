const fs = require('fs');
const path = require('path');

function resolveExistingPath(cwd, _path) {
  _path = path.join(cwd, _path);

  if (!fs.existsSync(_path)) {
    throw Error(`path "${_path}" not exists`);
  }

  return _path;
}

module.exports = resolveExistingPath;

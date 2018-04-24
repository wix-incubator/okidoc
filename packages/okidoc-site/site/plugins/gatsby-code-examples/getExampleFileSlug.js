const { EXAMPLES_PATH } = require('./constants');
const EXAMPLE_EXT_PATTERN = /\.js$/;

function getExampleFileSlug(filePath, fileDirectory) {
  if (!fileDirectory.endsWith('/')) {
    fileDirectory += '/';
  }

  return filePath
    .replace(fileDirectory, EXAMPLES_PATH)
    .replace(EXAMPLE_EXT_PATTERN, '');
}

module.exports = getExampleFileSlug;

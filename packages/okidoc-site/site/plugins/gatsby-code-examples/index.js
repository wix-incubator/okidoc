const fs = require('fs');
const path = require('path');
const visit = require('unist-util-visit');

const getExampleFileSlug = require('./getExampleFileSlug');
const { EXAMPLES_PATH_PATTERN } = require('./constants');

function withPrefix(path, pathPrefix = '') {
  // trim last '/' in `pathPrefix`
  return pathPrefix.replace(/\/$/, '') + '/' + path;
}

module.exports = ({ markdownAST, pathPrefix }, { path: directory }) => {
  directory = path.resolve(directory);

  visit(markdownAST, 'link', node => {
    if (EXAMPLES_PATH_PATTERN.test(node.url)) {
      const filePath = node.url.replace(EXAMPLES_PATH_PATTERN, directory + '/');

      if (!fs.existsSync(filePath)) {
        throw Error(
          `Invalid example link specified; no such file "${filePath}"`,
        );
      }

      node.url = withPrefix(
        getExampleFileSlug(filePath, directory),
        pathPrefix,
      );
    }
  });

  return markdownAST;
};

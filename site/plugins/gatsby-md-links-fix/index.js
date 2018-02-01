const visit = require('unist-util-visit');

function withPrefix(path, pathPrefix = '') {
  // ensure only one `/` in new path
  return (pathPrefix + path).replace(/\/\//, '/');
}

module.exports = ({ markdownAST, pathPrefix }) => {
  visit(markdownAST, 'link', node => {
    if (
      node.url.startsWith('/') &&
      pathPrefix &&
      !node.url.startsWith(pathPrefix)
    ) {
      node.url = withPrefix(node.url, pathPrefix);
    }
  });

  return markdownAST;
};

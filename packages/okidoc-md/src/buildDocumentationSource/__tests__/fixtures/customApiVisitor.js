const { cleanUpClassMethod } = require('../../../utils/nodeAST');

function createApiVisitor(enter) {
  return {
    Decorator(path) {
      if (path.node.expression.callee.name === 'api') {
        enter(path.parentPath);
      }
    },
  };
}

function createApiClassMethod(
  node,
  path,
  { JSDocCommentValue, identifierName } = {},
) {
  cleanUpClassMethod(node, { JSDocCommentValue, identifierName });

  return node;
}

module.exports = {
  createApiVisitor,
  createApiClassMethod,
};

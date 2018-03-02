const {
  cleanUpNodeJSDoc,
  removeNodeDecorators,
  removeNodeBody,
} = require('../../../utils/nodeAST');

function createApiVisitor(enter) {
  return {
    Decorator(path) {
      if (path.node.expression.callee.name === 'api') {
        enter(path.parentPath);
      }
    },
  };
}

function createApiMethod(node) {
  cleanUpNodeJSDoc(node);
  removeNodeDecorators(node);
  removeNodeBody(node);

  return node;
}

module.exports = {
  createApiVisitor,
  createApiMethod,
};

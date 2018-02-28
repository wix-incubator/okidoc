import { createJSDocCommentBlock } from '../utils/JSDocAST';

function createApiInterface(node) {
  // NOTE: add empty JSDoc to force `documentation.js` to add this class to documentation
  node.leadingComments = node.leadingComments || [createJSDocCommentBlock('')];

  return node;
}

export default createApiInterface;

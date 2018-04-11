import { cleanUpClassMethod } from '../utils/nodeAST';

function createApiClassMethod(
  node,
  path,
  { JSDocCommentValue, identifierName } = {},
) {
  cleanUpClassMethod(node, {
    JSDocCommentValue,
    identifierName,
  });

  return node;
}

export default createApiClassMethod;

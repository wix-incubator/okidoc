import { cleanUpClassDeclaration } from '../utils/nodeAST';

function createApiClassDeclaration(
  node,
  path,
  { JSDocCommentValue, identifierName } = {},
) {
  cleanUpClassDeclaration(node, {
    JSDocCommentValue,
    identifierName,
  });

  return node;
}

export default createApiClassDeclaration;

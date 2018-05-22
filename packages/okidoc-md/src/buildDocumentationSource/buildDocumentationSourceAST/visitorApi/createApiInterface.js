import { cleanUpInterfaceDeclaration } from '../../../utils/nodeAST';

function createApiInterface(
  node,
  path,
  { JSDocCommentValue, identifierName } = {},
) {
  cleanUpInterfaceDeclaration(node, {
    JSDocCommentValue,
    identifierName,
  });

  return node;
}

export default createApiInterface;

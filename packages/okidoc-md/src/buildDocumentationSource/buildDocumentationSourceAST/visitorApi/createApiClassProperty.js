import { cleanUpClassProperty } from '../../../utils/nodeAST';

function createApiClassProperty(
  node,
  path,
  { JSDocCommentValue, identifierName } = {},
) {
  cleanUpClassProperty(node, {
    JSDocCommentValue,
    identifierName,
  });

  return node;
}

export default createApiClassProperty;

import { cleanUpFunction } from '../utils/nodeAST';

function createApiFunction(
  node,
  path,
  { JSDocCommentValue, identifierName } = {},
) {
  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToExpression({
      allowInsertArrow: false,
      specCompliant: false,
    });
  }

  cleanUpFunction(node, { JSDocCommentValue, identifierName });

  return node;
}

export default createApiFunction;

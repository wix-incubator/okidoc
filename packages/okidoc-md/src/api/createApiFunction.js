import * as t from '@babel/types';
import { getJSDocComment } from '../utils/JSDocAST';
import { removeNodeDecorators, removeNodeBody } from '../utils/nodeAST';
import cleanUpNodeJSDoc from './cleanUpNodeJSDoc';

function createApiFunction(
  node,
  path,
  { docTag, JSDocComment, identifierName } = {},
) {
  JSDocComment = JSDocComment || getJSDocComment(node);

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToExpression({
      allowInsertArrow: false,
      specCompliant: false,
    });
  }

  if (identifierName) {
    node.id = t.identifier(identifierName);
  }

  cleanUpNodeJSDoc(node, JSDocComment, { docTag });
  removeNodeDecorators(node);
  removeNodeBody(node);

  return node;
}

export default createApiFunction;

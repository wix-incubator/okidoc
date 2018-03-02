import * as t from '@babel/types';

import { createJSDocCommentValue, getJSDocComment } from './JSDocAST';

/**
 * Ensure node JSDoc comment is provided and in valid position
 */
function cleanUpNodeJSDoc(node, defaultValue = '') {
  const JSDocComment = getJSDocComment(node);

  t.removeComments(node);
  t.addComment(
    node,
    'leading',
    createJSDocCommentValue(
      (JSDocComment && JSDocComment.value) || defaultValue,
    ),
  );
}

function removeNodeDecorators(node) {
  node.decorators = [];
}

function removeNodeBody(node) {
  node.body = t.blockStatement([]);
}

export { cleanUpNodeJSDoc, removeNodeDecorators, removeNodeBody };

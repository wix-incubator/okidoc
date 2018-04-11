import * as t from '@babel/types';

import { createJSDocCommentValue, getJSDocCommentValue } from './JSDocAST';

/**
 * Ensure node JSDoc comment is provided and in valid position
 */
function cleanUpNodeJSDoc(
  node,
  JSDocCommentValue = getJSDocCommentValue(node),
) {
  t.removeComments(node);
  t.addComment(node, 'leading', createJSDocCommentValue(JSDocCommentValue));
}

function cleanUpFunction(node, { identifierName, JSDocCommentValue } = {}) {
  if (identifierName) {
    node.id = t.identifier(identifierName);
  }

  node.decorators = [];
  node.body = t.blockStatement([]);

  cleanUpNodeJSDoc(node, JSDocCommentValue);
}

function cleanUpClassMethod(node, { identifierName, JSDocCommentValue } = {}) {
  if (identifierName) {
    node.key = t.identifier(identifierName);
  }

  // NOTE: ensure TS code is compatible with documentation.js (babel 7 flow preset)
  node.accessibility = null;
  node.decorators = [];
  node.body = t.blockStatement([]);

  cleanUpNodeJSDoc(node, JSDocCommentValue);
}

function cleanUpClassProperty(
  node,
  { identifierName, JSDocCommentValue } = {},
) {
  if (identifierName) {
    node.key = t.identifier(identifierName);
  }

  // NOTE: ensure TS code is compatible with documentation.js (babel 7 flow preset)
  node.accessibility = null;
  node.decorators = [];

  cleanUpNodeJSDoc(node, JSDocCommentValue);
}

export {
  cleanUpNodeJSDoc,
  cleanUpFunction,
  cleanUpClassMethod,
  cleanUpClassProperty,
};

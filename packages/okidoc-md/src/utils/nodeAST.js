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
  // https://github.com/niieani/typescript-vs-flowtype
  // https://github.com/babel/babel/blob/v7.0.0-beta.44/packages/babel-plugin-transform-typescript/src/index.js#L89
  node.accessibility = null;
  node.params = node.params.map(
    param => (param.type === 'TSParameterProperty' ? param.parameter : param),
  );

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
  // https://github.com/niieani/typescript-vs-flowtype
  // https://github.com/babel/babel/blob/v7.0.0-beta.44/packages/babel-plugin-transform-typescript/src/index.js#L155-L168
  node.accessibility = null;
  node.decorators = [];

  cleanUpNodeJSDoc(node, JSDocCommentValue);
}

function cleanUpClassDeclaration(
  node,
  { identifierName, JSDocCommentValue } = {},
) {
  if (identifierName) {
    node.key = t.identifier(identifierName);
  }

  node.decorators = [];
  node.superClass = null;

  cleanUpNodeJSDoc(node, JSDocCommentValue);

  node.body = t.classBody(
    node.body.body.reduce((items, item) => {
      if (item.accessibility === 'private') {
        return items;
      }

      if (t.isClassMethod(item)) {
        cleanUpClassMethod(item);
        return items.concat(item);
      }

      if (t.isClassProperty(item)) {
        cleanUpClassProperty(item);
        return items.concat(item);
      }

      return items;
    }, []),
  );
}

export {
  cleanUpNodeJSDoc,
  cleanUpFunction,
  cleanUpClassMethod,
  cleanUpClassProperty,
  cleanUpClassDeclaration,
};

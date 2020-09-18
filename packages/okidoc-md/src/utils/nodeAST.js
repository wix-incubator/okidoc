import * as t from '@babel/types';
import generate from '@babel/generator';

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

  if (node.typeParameters) {
    /*
      Removes generic constraint, because they can't be parsed by documentation.js:
      `function<T extends string>(param: T): T`
     */
    node.typeParameters.params.forEach(typeParam => {
      typeParam.constraint = undefined;
    });
  }

  if (node.params) {
    /*
      Generates conditional types for function's params in documentation.js compatible format:
      `function<T>(param: T extends string ? boolean : number): void`
     */
    node.params.forEach(param => {
      const paramTypeAnnotation = param.typeAnnotation?.typeAnnotation;
      if (paramTypeAnnotation?.type === 'TSConditionalType') {
        param.typeAnnotation.typeAnnotation = {
          type: 'TSTypeReference',
          typeName: {
            type: 'Identifier',
            name: `"${generate(paramTypeAnnotation).code}"`,
          },
        };
      }
    });
  }

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
  node.params = node.params.map(param =>
    param.type === 'TSParameterProperty' ? param.parameter : param,
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
  node.optional = false;

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

function cleanUpInterfaceDeclaration(
  node,
  { identifierName, JSDocCommentValue } = {},
) {
  if (identifierName) {
    node.key = t.identifier(identifierName);
  }

  cleanUpNodeJSDoc(node, JSDocCommentValue);

  // NOTE: ensure TS code is compatible with documentation.js (babel 7 flow preset)
  // https://github.com/niieani/typescript-vs-flowtype
  // https://github.com/babel/babel/blob/v7.0.0-beta.44/packages/babel-plugin-transform-typescript/src/index.js#L155-L168
  node.body.body.forEach(item => {
    if (item.type === 'TSPropertySignature') {
      // NOTE: fix issue with ts vs flow optional
      // TODO: add some tests
      // https://astexplorer.net/#/gist/cacc96434025f24c9e9f929270b1e42e/fc63289dc754ada2eb8a2abf4aacbb5fb431efde
      item.optional = false;
    }

    if (item.type === 'TSMethodSignature') {
      // NOTE: fix issue #66 with ts vs flow optional
      item.optional = false;

      // convert code like `show();` to `show(): void;`
      if (!item.typeAnnotation) {
        item.typeAnnotation = t.tsTypeAnnotation(t.tsVoidKeyword());
      }
    }
  });
}

function withJSDoc(node, JSDocCommentValue) {
  t.addComment(node, 'leading', createJSDocCommentValue(JSDocCommentValue));

  return node;
}

export {
  cleanUpNodeJSDoc,
  cleanUpFunction,
  cleanUpClassMethod,
  cleanUpClassProperty,
  cleanUpClassDeclaration,
  cleanUpInterfaceDeclaration,
  withJSDoc,
};

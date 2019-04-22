import getVisitorApi from './getVisitorApi';
import traverse from './traverse';
import { withJSDoc } from '../../utils/nodeAST';
import * as t from '@babel/types';

import { API_CLASS_IDENTIFIER } from '../../constants';

function buildDocumentationSourceAST({
  entry,
  pattern,
  source,
  tag,
  visitor: visitorPath,
}) {
  const {
    createApiVisitor,
    createApiInterface,
    createApiClassDeclaration,
    createApiClassMethod,
    createApiClassProperty,
    createApiFunction,
  } = getVisitorApi({ tag, visitorPath });

  const interfaces = [];
  const classDeclarations = [];
  const classBodyItems = [];
  const functions = [];

  // NOTE: read about visitors
  // https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
  // https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js
  const visitors = {
    'InterfaceDeclaration|TSInterfaceDeclaration': path => {
      interfaces.push(createApiInterface(path.node, path));
    },
    ...createApiVisitor((path, options) => {
      if (path.isClassDeclaration()) {
        classDeclarations.push(
          createApiClassDeclaration(path.node, path, options),
        );
        return;
      }

      if (path.isClassMethod()) {
        classBodyItems.push(createApiClassMethod(path.node, path, options));
        return;
      }

      if (path.isClassProperty(path)) {
        classBodyItems.push(createApiClassProperty(path.node, path, options));
        return;
      }

      if (
        path.isFunctionDeclaration() ||
        path.isFunctionExpression() ||
        path.isArrowFunctionExpression()
      ) {
        functions.push(createApiFunction(path.node, path, options));
      }
    }),
  };

  traverse({ entry, pattern, source }, visitors);

  if (classBodyItems.length) {
    // NOTE: add extracted class body items as new class declaration with API_CLASS_IDENTIFIER as name
    // NOTE: add empty comment to force JSDoc util to add this class to documentation
    classDeclarations.push(
      withJSDoc(
        t.classDeclaration(
          t.identifier(API_CLASS_IDENTIFIER),
          null,
          t.classBody(classBodyItems),
        ),
        '',
      ),
    );
  }

  return {
    type: 'Program',
    body: interfaces.concat(classDeclarations, functions),
  };
}

export { API_CLASS_IDENTIFIER };

export default buildDocumentationSourceAST;

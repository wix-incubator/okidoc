import createApiVisitor from './createApiVisitor';
import traverse from './traverse';
import { createApiInterface, buildApiClassDeclaration } from '../../api';

function buildDocumentationSourceAST({
  entry,
  pattern,
  source,
  tag,
  visitor: visitorPath,
}) {
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
    ...createApiVisitor(
      { tag, visitorPath },
      (path, options, { createApiMethod, createApiFunction }) => {
        if (path.isClassMethod() || path.isClassProperty(path)) {
          classBodyItems.push(createApiMethod(path.node, path, options));
        }

        if (
          path.isFunctionDeclaration() ||
          path.isFunctionExpression() ||
          path.isArrowFunctionExpression()
        ) {
          functions.push(createApiFunction(path.node, path, options));
        }
      },
    ),
  };

  traverse({ entry, pattern, source }, visitors);

  if (classBodyItems.length) {
    classDeclarations.push(buildApiClassDeclaration(classBodyItems));
  }

  return {
    type: 'Program',
    body: interfaces.concat(classDeclarations, functions),
  };
}

export default buildDocumentationSourceAST;

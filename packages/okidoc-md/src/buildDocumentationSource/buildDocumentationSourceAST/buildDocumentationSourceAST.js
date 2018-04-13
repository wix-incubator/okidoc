import createApiVisitor from './createApiVisitor';
import traverse from './traverse';
import * as visitorApi from '../../api';

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
      interfaces.push(visitorApi.createApiInterface(path.node, path));
    },
    ...createApiVisitor(
      { tag, visitorPath },
      (
        path,
        options,
        {
          createApiClassDeclaration = visitorApi.createApiClassDeclaration,
          createApiClassMethod = visitorApi.createApiClassMethod,
          createApiClassProperty = visitorApi.createApiClassProperty,
          createApiFunction = visitorApi.createApiFunction,
        } = {},
      ) => {
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
      },
    ),
  };

  traverse({ entry, pattern, source }, visitors);

  if (classBodyItems.length) {
    classDeclarations.push(visitorApi.buildApiClassDeclaration(classBodyItems));
  }

  return {
    type: 'Program',
    body: interfaces.concat(classDeclarations, functions),
  };
}

export default buildDocumentationSourceAST;

import getVisitorApi from './getVisitorApi';
import traverse from './traverse';
import { withJSDoc } from '../../utils/nodeAST';
import * as t from '@babel/types';

import { API_CLASS_IDENTIFIER } from '../../constants';

import buildProgram from '../../utils/buildProgram';
import buildDependenciesTree from './buildDependenciesTree';

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
  const functions = [];
  const classDeclarations = [];
  const classBodyItems = [];

  // before traversing the files build a tree with all defined interfaces and dependencies
  const dependenciesTree = buildDependenciesTree({ entry, pattern, source });

  function pushInterface({ node, interfaces }) {
    const apiInterface = createApiInterface(node);
    interfaces.push(apiInterface);
  }

  // NOTE: read about visitors
  // https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
  // https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js
  const interfaceVisitor = {
    TSTypeReference: (path, state) => {
      const file = dependenciesTree.get(state.filePath);

      if (file) {
        const typeName = path.node.typeName.name;
        // NOTE: it might be the case when more than 1 import exists.
        // Example:
        // import { MyType } from './types';
        // import { MyType } from './another-type';
        // in this case both of them would be added to the doc
        file.dependencies.forEach((importSpecifiers, absoluteFilePath) => {
          const importSpecifier = importSpecifiers.find(
            specifier => specifier.local.name === typeName,
          );

          if (importSpecifier) {
            const interfaceFile = dependenciesTree.get(absoluteFilePath);

            if (interfaceFile) {
              const importName = t.isImportDefaultSpecifier(importSpecifier)
                ? importSpecifier.local.name
                : importSpecifier.imported.name;
              const interfaceNode = interfaceFile.interfaces.find(
                node => node.id.name === importName,
              );

              if (interfaceNode) {
                pushInterface({ node: interfaceNode, interfaces });
              }
            }
          }
        });

        // find interfaces defined in current file (without imports)
        const localInterface = file.interfaces.find(
          node => node.id.name === typeName,
        );
        if (localInterface) {
          pushInterface({ node: localInterface, interfaces });
        }
      }
    },
  };

  // TODO: fixme
  let filePath;

  const visitors = {
    enter: (path, state) => {
      //store filePath locally in order to be able
      filePath = state.filePath;
    },
    ...createApiVisitor((path, options) => {
      if (path.isClassDeclaration()) {
        classDeclarations.push(
          createApiClassDeclaration(path.node, path, options),
        );
        path.traverse(interfaceVisitor, { filePath });
        return;
      }

      if (path.isClassMethod()) {
        classBodyItems.push(createApiClassMethod(path.node, path, options));
        path.traverse(interfaceVisitor, { filePath });
        return;
      }

      if (path.isClassProperty(path)) {
        classBodyItems.push(createApiClassProperty(path.node, path, options));
        path.traverse(interfaceVisitor, { filePath }, {});
        return;
      }

      if (
        path.isFunctionDeclaration() ||
        path.isFunctionExpression() ||
        path.isArrowFunctionExpression()
      ) {
        functions.push(createApiFunction(path.node, path, options));
        path.traverse(interfaceVisitor, { filePath });
      }
    }),
  };

  traverse({
    dependenciesTree,
    visitors,
  });

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

  return buildProgram(interfaces, classDeclarations, functions);
}

export { API_CLASS_IDENTIFIER };

export default buildDocumentationSourceAST;

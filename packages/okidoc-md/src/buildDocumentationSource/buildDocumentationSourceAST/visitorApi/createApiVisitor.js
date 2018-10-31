import { getJSDocCommentValue } from '../../../utils/JSDocAST';
import escapeRegExp from '../../../utils/escapeRegExp';
import createDocTagParam from './createDocTagParam';
import removeDocTagFromJSDocCommentValue from './removeDocTagFromJSDocCommentValue';

function createApiVisitor(docTag, enter) {
  const DOC_TAG_PARAM = escapeRegExp(createDocTagParam(docTag));
  const DOC_TAG_PARAM_PATTERN = new RegExp(`\\s${DOC_TAG_PARAM}\\s`);

  const visited = [];

  function hasDocTagInJSDoc(node) {
    const JSDocCommentValue = getJSDocCommentValue(node);

    return !!JSDocCommentValue && DOC_TAG_PARAM_PATTERN.test(JSDocCommentValue);
  }

  function enterApi(path, options = {}) {
    if (visited.includes(path.node)) {
      return;
    }

    const JSDocCommentValue =
      options.JSDocCommentValue || getJSDocCommentValue(path.node);

    enter(path, {
      ...options,
      JSDocCommentValue: removeDocTagFromJSDocCommentValue(
        JSDocCommentValue,
        docTag,
      ),
    });

    visited.push(path.node);
  }

  function enterAssignmentExpression(
    assignmentExpressionPath,
    { JSDocCommentValue },
  ) {
    const leftPath = assignmentExpressionPath.get('left');
    const rightPath = assignmentExpressionPath.get('right');

    if (
      leftPath.isIdentifier() &&
      (rightPath.isFunctionExpression() ||
        rightPath.isArrowFunctionExpression())
    ) {
      enterApi(rightPath, {
        identifierName: leftPath.node.name,
        JSDocCommentValue: JSDocCommentValue,
      });

      return;
    }

    console.warn(
      `${leftPath.type} = ${
        rightPath.type
      } is currently not supported by okidoc-md @doc tag visitor`,
    );
  }

  function enterVariableDeclaration(
    variableDeclarationPath,
    { JSDocCommentValue },
  ) {
    const variableDeclaratorId = variableDeclarationPath.get(
      'declarations.0.id',
    );
    const variableDeclaratorInit = variableDeclarationPath.get(
      'declarations.0.init',
    );

    if (
      variableDeclaratorInit.isFunctionExpression() ||
      variableDeclaratorInit.isArrowFunctionExpression()
    ) {
      enterApi(variableDeclaratorInit, {
        identifierName: variableDeclaratorId.node.name,
        JSDocCommentValue: JSDocCommentValue,
      });

      return;
    }

    // TODO: add logic for 'var', 'let', 'constant', ...

    console.warn(
      `${
        variableDeclaratorInit.type
      } is currently not supported by okidoc-md @doc tag visitor`,
    );
  }

  return {
    'ExportNamedDeclaration|ExportDefaultDeclaration'(path) {
      if (!hasDocTagInJSDoc(path.node)) {
        return;
      }

      const declarationPath = path.get('declaration');
      const JSDocCommentValue = getJSDocCommentValue(path.node);

      if (declarationPath.isClassDeclaration()) {
        enterApi(declarationPath, {
          JSDocCommentValue: JSDocCommentValue,
        });

        // skip nested visitors like ClassMethod
        path.skip();
        return;
      }

      if (declarationPath.isFunctionDeclaration()) {
        enterApi(declarationPath, {
          JSDocCommentValue: JSDocCommentValue,
        });
        return;
      }

      if (declarationPath.isAssignmentExpression()) {
        enterAssignmentExpression(declarationPath, {
          JSDocCommentValue: JSDocCommentValue,
        });

        return;
      }

      if (declarationPath.isVariableDeclaration()) {
        enterVariableDeclaration(declarationPath, {
          JSDocCommentValue: JSDocCommentValue,
        });
        return;
      }

      // TODO: add logic for other node types

      console.warn(
        `${
          declarationPath.type
        } is currently not supported by okidoc-md @doc tag visitor`,
      );
    },
    VariableDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enterVariableDeclaration(path, {
          JSDocCommentValue: getJSDocCommentValue(path.node),
        });
      }
    },
    ClassDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enterApi(path);

        // skip nested visitors like ClassMethod
        path.skip();
      }
    },
    'ClassMethod|ClassProperty'(path) {
      if (
        hasDocTagInJSDoc(path.node) &&
        path.node.accessibility !== 'private'
      ) {
        enterApi(path);
      }
    },
    FunctionDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enterApi(path);
      }
    },
  };
}

export default createApiVisitor;

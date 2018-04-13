import { getJSDocComment } from '../utils/JSDocAST';
import escapeRegExp from '../utils/escapeRegExp';
import createDocTagParam from './createDocTagParam';

function isClassMethodAllowedInApi(node) {
  return node.accessibility !== 'private' && node.kind !== 'constructor';
}

function createApiVisitor(docTag, enter) {
  const DOC_TAG_PARAM = escapeRegExp(createDocTagParam(docTag));
  const DOC_TAG_PARAM_PATTERN = new RegExp(`\\s${DOC_TAG_PARAM}\\s`);

  const visited = [];

  function hasDocTagInJSDoc(node) {
    const JSDocComment = getJSDocComment(node);
    const JSDocCommentValue = JSDocComment && JSDocComment.value;

    return !!JSDocCommentValue && DOC_TAG_PARAM_PATTERN.test(JSDocCommentValue);
  }

  function enterIfNotVisited(path, options) {
    if (visited.includes(path.node)) {
      return;
    }

    enter(path, {
      docTag,
      ...options,
    });

    visited.push(path.node);
  }

  function enterAssignmentExpression(
    assignmentExpressionPath,
    { JSDocComment } = {},
  ) {
    const leftPath = assignmentExpressionPath.get('left');
    const rightPath = assignmentExpressionPath.get('right');

    if (
      leftPath.isIdentifier() &&
      (rightPath.isFunctionExpression() ||
        rightPath.isArrowFunctionExpression())
    ) {
      enterIfNotVisited(rightPath, {
        identifierName: leftPath.node.name,
        JSDocComment: JSDocComment,
      });

      return;
    }

    console.warn(
      `${leftPath.type} = ${
        rightPath.type
      } is currently not supported by okidoc-md`,
    );
  }

  function enterVariableDeclaration(
    variableDeclarationPath,
    { JSDocComment } = {},
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
      enterIfNotVisited(variableDeclaratorInit, {
        identifierName: variableDeclaratorId.node.name,
        JSDocComment: JSDocComment,
      });

      return;
    }

    // TODO: add logic for 'var', 'let', 'constant', ...

    console.warn(
      `${variableDeclaratorInit.type} is currently not supported by okidoc-md`,
    );
  }

  function enterClassMethod(classMethodPath) {
    if (isClassMethodAllowedInApi(classMethodPath.node)) {
      enterIfNotVisited(classMethodPath);
    }
  }

  return {
    'ExportNamedDeclaration|ExportDefaultDeclaration'(path) {
      if (!hasDocTagInJSDoc(path.node)) {
        return;
      }

      const declarationPath = path.get('declaration');
      const JSDocComment = getJSDocComment(path.node);

      if (declarationPath.isClassDeclaration()) {
        declarationPath.traverse({
          ClassMethod(path) {
            enterClassMethod(path);
          },
        });
        return;
      }

      if (declarationPath.isFunctionDeclaration()) {
        enterIfNotVisited(declarationPath, {
          JSDocComment,
        });
        return;
      }

      if (declarationPath.isAssignmentExpression()) {
        enterAssignmentExpression(declarationPath, {
          JSDocComment,
        });

        return;
      }

      if (declarationPath.isVariableDeclaration()) {
        enterVariableDeclaration(declarationPath, {
          JSDocComment,
        });
        return;
      }

      // TODO: add logic for other node types

      console.warn(
        `${declarationPath.type} is currently not supported by okidoc-md`,
      );
    },
    ClassDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        path.traverse({
          ClassMethod(path) {
            enterClassMethod(path);
          },
        });
      }
    },
    ClassMethod(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enterClassMethod(path);
      }
    },
    FunctionDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enterIfNotVisited(path);
      }
    },
    VariableDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enterVariableDeclaration(path, {
          JSDocComment: getJSDocComment(path.node),
        });
      }
    },
  };
}

export default createApiVisitor;

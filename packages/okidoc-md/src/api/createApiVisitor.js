import { isJSDocIncludes } from '../utils/JSDocAST';
import createDocTagParam from './createDocTagParam';

function isClassMethodAllowedInApi(node) {
  return node.accessibility !== 'private' && node.kind !== 'constructor';
}

function createApiVisitor(tag, enter) {
  const DOC_TAG_PARAM = createDocTagParam(tag);

  function hasDocTagInJSDoc(node) {
    return isJSDocIncludes(node, DOC_TAG_PARAM);
  }

  return {
    'ExportDefaultDeclaration|ClassDeclaration'(path) {
      if (hasDocTagInJSDoc(path.node)) {
        path.traverse({
          ClassMethod(path) {
            if (isClassMethodAllowedInApi(path.node)) {
              enter(path);
            }
          },
        });
      }
    },
    ClassMethod(path) {
      if (hasDocTagInJSDoc(path.node) && isClassMethodAllowedInApi(path.node)) {
        enter(path);
      }
    },
    FunctionDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enter(path);
      }
    },
    ExportNamedDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enter(path);
      }
    },
    VariableDeclaration(path) {
      if (hasDocTagInJSDoc(path.node)) {
        enter(path);
      }
    },
  };
}

export default createApiVisitor;

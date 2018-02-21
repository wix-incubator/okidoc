import { isJSDocIncludes } from '../utils/ast';
import createDocTagParam from './createDocTagParam';

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
            if (path.node.accessibility !== 'private') {
              enter(path);
            }
          },
        });
      }
    },
    ClassMethod(path) {
      if (hasDocTagInJSDoc(path.node)) {
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

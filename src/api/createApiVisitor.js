import { getJSDocComment } from '../utils/ast';
import createDocTagParam from './createDocTagParam';

function createApiVisitor(tag, enter) {
  const TAG_PARAM = createDocTagParam(tag);

  function hasTagInJSDoc(node) {
    const jsDocComment = getJSDocComment(node);

    return !!jsDocComment && jsDocComment.value.includes(TAG_PARAM);
  }

  return {
    'ExportDefaultDeclaration|ClassDeclaration'(path) {
      if (hasTagInJSDoc(path.node)) {
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
      if (hasTagInJSDoc(path.node)) {
        enter(path);
      }
    },
    FunctionDeclaration(path) {
      if (hasTagInJSDoc(path.node)) {
        enter(path);
      }
    },
    VariableDeclaration(path) {
      if (hasTagInJSDoc(path.node)) {
        enter(path);
      }
    },
  };
}

export default createApiVisitor;

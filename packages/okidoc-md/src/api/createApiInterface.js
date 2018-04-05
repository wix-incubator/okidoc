import * as t from '@babel/types';
import { createJSDocCommentBlock } from '../utils/JSDocAST';

function createApiInterface(node, path) {
  // NOTE: add empty JSDoc to force `documentation.js` to add this class to documentation
  node.leadingComments = node.leadingComments || [createJSDocCommentBlock('')];

  // NOTE: ensure TS code is compatible with documentation.js (babel 7 flow preset)
  path.traverse({
    TSMethodSignature(path) {
      // convert code like `show();` to `show(): void;`
      if (!path.node.typeAnnotation) {
        path.node.typeAnnotation = t.tsTypeAnnotation(t.tsVoidKeyword());
      }
    },
  });

  return node;
}

export default createApiInterface;

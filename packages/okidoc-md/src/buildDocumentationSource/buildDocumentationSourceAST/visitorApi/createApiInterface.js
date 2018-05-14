import * as t from '@babel/types';
import { createJSDocCommentBlock } from '../../../utils/JSDocAST';

function createApiInterface(node, path) {
  // NOTE: add empty JSDoc to force `documentation.js` to add this class to documentation
  node.leadingComments = node.leadingComments || [createJSDocCommentBlock('')];

  // NOTE: ensure TS code is compatible with documentation.js (babel 7 flow preset)
  path.traverse({
    TSPropertySignature(path) {
      // NOTE: fix issue with ts vs flow optional
      // TODO: add some tests
      // https://astexplorer.net/#/gist/cacc96434025f24c9e9f929270b1e42e/fc63289dc754ada2eb8a2abf4aacbb5fb431efde
      path.node.optional = false;
    },
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

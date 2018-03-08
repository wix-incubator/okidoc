import * as t from '@babel/types';
import removeDocTagFromJSDocCommentValue from './removeDocTagFromJSDocCommentValue';
import { createJSDocCommentValue } from '../utils/JSDocAST';

function cleanUpNodeJSDoc(node, JSDocComment, { docTag } = {}) {
  const JSDocCommentValue = JSDocComment ? JSDocComment.value : '';

  t.removeComments(node);
  t.addComment(
    node,
    'leading',
    createJSDocCommentValue(
      docTag
        ? removeDocTagFromJSDocCommentValue(JSDocCommentValue, docTag)
        : JSDocCommentValue,
    ),
  );
}

export default cleanUpNodeJSDoc;

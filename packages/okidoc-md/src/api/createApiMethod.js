import * as t from '@babel/types';
import { getJSDocComment, createJSDocCommentValue } from '../utils/JSDocAST';
import { removeNodeDecorators, removeNodeBody } from '../utils/nodeAST';
import escapeRegExp from '../utils/escapeRegExp';

import createDocTagParam from './createDocTagParam';

function removeDocTagFromJSDoc(value, docTag) {
  if (!docTag) {
    return value;
  }

  const DOC_TAG_PARAM = escapeRegExp(createDocTagParam(docTag));
  const REPLACE_PATTERN = new RegExp(`\\s*\\*\\s*${DOC_TAG_PARAM}`, 'g');

  return value.replace(REPLACE_PATTERN, '');
}

function createApiMethod(apiMethod, docTag) {
  const apiMethodJSDoc = getJSDocComment(apiMethod);

  t.removeComments(apiMethod);
  t.addComment(
    apiMethod,
    'leading',
    createJSDocCommentValue(
      apiMethodJSDoc ? removeDocTagFromJSDoc(apiMethodJSDoc.value, docTag) : '',
    ),
  );

  removeNodeDecorators(apiMethod);
  removeNodeBody(apiMethod);

  return apiMethod;
}

export default createApiMethod;

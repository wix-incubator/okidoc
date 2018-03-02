import * as t from '@babel/types';
import { getJSDocComment, createJSDocCommentValue } from '../utils/JSDocAST';
import { removeNodeDecorators, removeNodeBody } from '../utils/nodeAST';

import createDocTagParam from './createDocTagParam';

function removeDocTagFromJSDoc(value, docTag) {
  return value.replace(createDocTagParam(docTag), '');
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

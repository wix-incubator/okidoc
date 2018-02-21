import * as t from '@babel/types';
import { isJSDocComment, createJSDocComment } from '../utils/ast';

import createDocTagParam from './createDocTagParam';

function removeDocTagFromJSDoc(value, docTag) {
  return value.replace(createDocTagParam(docTag), '');
}

function createApiMethod(apiMethod, docTag) {
  const apiMethodComments = apiMethod.leadingComments;
  const apiMethodJSDoc =
    apiMethodComments && apiMethodComments.find(isJSDocComment);

  t.removeComments(apiMethod);
  t.addComment(
    apiMethod,
    'leading',
    createJSDocComment(
      apiMethodJSDoc ? removeDocTagFromJSDoc(apiMethodJSDoc.value, docTag) : '',
    ),
  );

  apiMethod.decorators = [];
  apiMethod.body = t.blockStatement([]);

  return apiMethod;
}

export default createApiMethod;

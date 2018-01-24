import * as t from '@babel/types';
import { isJSDocComment, createJSDocComment } from '../utils/ast';

function createApiMethod(apiMethod) {
  const apiMethodComments = apiMethod.leadingComments;
  const apiMethodJSDoc =
    apiMethodComments && apiMethodComments.find(isJSDocComment);

  t.removeComments(apiMethod);
  t.addComment(
    apiMethod,
    'leading',
    createJSDocComment((apiMethodJSDoc && apiMethodJSDoc.value) || ''),
  );

  apiMethod.decorators = [];
  apiMethod.body = t.blockStatement([]);

  return apiMethod;
}

export default createApiMethod;

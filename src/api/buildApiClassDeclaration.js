import * as t from '@babel/types';
import { createJSDocComment } from '../utils/ast';

const API_CLASS_IDENTIFIER = 'API';

function buildApiClassDeclaration(apiMethods) {
  const apiClassDeclaration = t.classDeclaration(
    t.identifier(API_CLASS_IDENTIFIER),
    null,
    t.classBody(apiMethods),
  );

  // NOTE: if JSDoc not provided, add empty comment to force JSDoc util to add this class to documentation
  t.addComment(apiClassDeclaration, 'leading', createJSDocComment(''));

  return apiClassDeclaration;
}

export { API_CLASS_IDENTIFIER };

export default buildApiClassDeclaration;

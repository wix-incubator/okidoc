import * as t from '@babel/types';
import { createJSDocComment } from '../utils/ast';

function buildPlayerClassDeclaration(playerApiMethods) {
  const playerClassDeclaration = t.classDeclaration(
    t.identifier('Player'),
    null,
    t.classBody(playerApiMethods),
  );

  // NOTE: if JSDoc not provided, add empty comment to force JSDoc util to add this class to documentation
  t.addComment(playerClassDeclaration, 'leading', createJSDocComment(''));

  return playerClassDeclaration;
}

export default buildPlayerClassDeclaration;

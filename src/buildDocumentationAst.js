import glob from './utils/glob';
import traverseFiles from './utils/traverseFiles';
import {
  createPlayerApiVisitor,
  createPlayerApiMethod,
  createPlayerApiInterface,
  buildPlayerClassDeclaration,
} from './player';

function buildDocumentationAst(pattern) {
  const files = glob(pattern);
  const playerApiInterfaces = [];
  const playerApiMethods = [];

  // NOTE: read about visitors
  // https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
  // https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js
  traverseFiles(files, {
    'InterfaceDeclaration|TSInterfaceDeclaration': path => {
      playerApiInterfaces.push(createPlayerApiInterface(path.node));
    },
    ...createPlayerApiVisitor(path => {
      playerApiMethods.push(createPlayerApiMethod(path.node));
    }),
  });

  const playerClassDeclaration = buildPlayerClassDeclaration(playerApiMethods);

  return {
    type: 'Program',
    body: playerApiInterfaces.concat(playerClassDeclaration),
  };
}

export default buildDocumentationAst;

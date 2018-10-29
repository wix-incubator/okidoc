import babelTraverse from '@babel/traverse';

function traverse({ dependenciesTree, visitors, options }) {
  // traverse files in insertion order
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
  dependenciesTree.forEach((node, filePath) => {
    babelTraverse(node.fileAST, visitors, null , {
      filePath,
      dependenciesTree,
      ...options,
    });
  });
  return options;
}

export default traverse;

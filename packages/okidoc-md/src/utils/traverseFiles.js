import traverse from '@babel/traverse';
import parseFile from './parseFile';
import glob from './glob';

function traverseFiles(pattern, visitor) {
  const files = glob(pattern);

  if (files.length === 0) {
    console.warn(`files not found for ${pattern} pattern`);
    return;
  }

  files.forEach(filePath => {
    traverse(parseFile(filePath), visitor);
  });
}

export default traverseFiles;

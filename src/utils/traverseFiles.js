import traverse from '@babel/traverse';
import parseFile from './parseFile';

function traverseFiles(files, visitor) {
  files.forEach(filePath => {
    traverse(parseFile(filePath), visitor);
  });
}

export default traverseFiles;

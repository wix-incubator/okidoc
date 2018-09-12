import traverse from '@babel/traverse';
import parseSource from './parseSource';

function traverseSource(source, visitors) {
  traverse(parseSource(source), visitors, null, { filePath: 'source' });
}

export default traverseSource;

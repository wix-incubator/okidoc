import fs from 'fs';
import parseSource from './parseSource';

function parseFile(filePath) {
  const fileSource = fs.readFileSync(filePath).toString();

  return parseSource(fileSource);
}

export default parseFile;

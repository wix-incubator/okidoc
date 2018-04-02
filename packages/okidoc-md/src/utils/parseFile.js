import fs from 'fs';
import path from 'path';
import parseSource from './parseSource';

function parseFile(filePath) {
  const fileSource = fs.readFileSync(filePath).toString();

  try {
    return parseSource(fileSource);
  } catch (error) {
    error.message = `${path.relative(process.cwd(), filePath)}: ${
      error.message
    }`;
    throw error;
  }
}

export default parseFile;

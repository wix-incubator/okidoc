import fs from 'fs';
import path from 'path';

function createFileDirectoryIfNotExists(filePath) {
  const fileDirectory = path.dirname(filePath);
  if (fs.existsSync(fileDirectory)) {
    return true;
  }

  createFileDirectoryIfNotExists(fileDirectory);

  fs.mkdirSync(fileDirectory);
}

export default createFileDirectoryIfNotExists;

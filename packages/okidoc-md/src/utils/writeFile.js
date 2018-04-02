import fs from 'fs';
import path from 'path';
import util from 'util';

const _writeFile = util.promisify(fs.writeFile);

function createFileDirectoryIfNotExists(filePath) {
  const fileDirectory = path.dirname(filePath);
  if (fs.existsSync(fileDirectory)) {
    return true;
  }

  createFileDirectoryIfNotExists(fileDirectory);

  fs.mkdirSync(fileDirectory);
}

function writeFile(filePath, fileData) {
  createFileDirectoryIfNotExists(filePath);

  return _writeFile(filePath, fileData);
}

export default writeFile;

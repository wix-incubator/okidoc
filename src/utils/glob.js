import path from 'path';
import _glob from 'glob';
import minimatch from 'minimatch';

function isMatchGlob(filePath, pattern) {
  const relativeFilePath = path.relative(process.cwd(), filePath);

  return minimatch(relativeFilePath, pattern, { dot: false });
}

function glob(pattern) {
  return _glob.sync(pattern, { nodir: true, dot: false });
}

export { isMatchGlob };

export default glob;

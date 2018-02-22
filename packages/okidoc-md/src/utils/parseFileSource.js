import { parse } from 'babylon';

function parseFileSource(fileSource) {
  return parse(fileSource, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'classProperties',
      'objectRestSpread',
      'decorators',
    ],
  });
}

export default parseFileSource;

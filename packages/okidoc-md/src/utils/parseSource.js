import { parse } from 'babylon';

function parseSource(source) {
  return parse(source, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'classProperties',
      'objectRestSpread',
      'decorators',
    ],
  });
}

export default parseSource;

import { parse } from '@babel/parser';
import { codeFrameColumns } from '@babel/code-frame';

function parseSource(source) {
  try {
    return parse(source, {
      sourceType: 'module',
      plugins: [
        // TODO: allow jsx in next major version #69
        // 'jsx',
        'typescript',
        'classProperties',
        'objectRestSpread',
        [
          'decorators',
          {
            decoratorsBeforeExport: true,
          },
        ],
      ],
    });
  } catch (error) {
    if (error.loc) {
      error.codeFrame = codeFrameColumns(source, {
        start: error.loc,
      });
      error.message += `\n${error.codeFrame}`;
      throw error;
    }

    throw error.stack;
  }
}

export default parseSource;

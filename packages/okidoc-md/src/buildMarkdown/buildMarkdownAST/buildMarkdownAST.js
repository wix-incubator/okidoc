import u from 'unist-builder';
import renderComment from './renderComment';

const GENERATOR_COMMENT = `<!-- Generated automatically. Update this documentation by updating the source code. -->`;

function buildMarkdownAST(comments, { title } = {}) {
  const docInterfaces = comments.filter(({ kind }) => kind === 'interface');

  // NOTE: use https://eslint.org/doctrine/demo/ to better understand `comments` format

  const root = u('root', [
    u('html', GENERATOR_COMMENT),
    u('heading', { depth: 1 }, [u('text', title || '')]),
    ...comments.reduce(
      (memo, comment) =>
        memo.concat(
          renderComment(comment, {
            depth: 2,
            interfaces: docInterfaces,
          }),
        ),
      [],
    ),
  ]);

  return Promise.resolve(root);
}

export default buildMarkdownAST;

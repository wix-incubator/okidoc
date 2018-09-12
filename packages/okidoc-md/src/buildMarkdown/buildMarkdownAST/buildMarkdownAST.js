import u from 'unist-builder';
import renderComment from './renderComment';

const GENERATOR_COMMENT = `<!-- Generated automatically. Update this documentation by updating the source code. -->`;

function buildMarkdownAST(comments, { title, excludeKind = [] } = {}) {
  const docInterfaces = comments.filter(({ kind }) => kind === 'interface');

  // NOTE: to better understand `comments` format see:
  // - https://github.com/documentationjs/documentation/blob/v6.2.0/declarations/comment.js
  // - https://github.com/syntax-tree/mdast
  // - https://eslint.org/doctrine/demo/
  // - https://unifiedjs.github.io/

  const hasHeading = !!title;
  const depth = hasHeading ? 1 : 0;

  const root = u('root', [
    u('html', GENERATOR_COMMENT),
    ...(hasHeading ? [u('heading', { depth: depth }, [u('text', title)])] : []),
    ...comments.reduce(
      (memo, comment) =>
        memo.concat(
          renderComment(comment, {
            depth: depth + 1,
            interfaces: docInterfaces,
            excludeKind,
          }),
        ),
      [],
    ),
  ]);

  return Promise.resolve(root);
}

export default buildMarkdownAST;

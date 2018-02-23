import remark from 'remark';
import buildMarkdownAST from './buildMarkdownAST';

function buildMarkdown(comments, args) {
  return buildMarkdownAST(comments, args).then(ast => remark().stringify(ast));
}

export default buildMarkdown;

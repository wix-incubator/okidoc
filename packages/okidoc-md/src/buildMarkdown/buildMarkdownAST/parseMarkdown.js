import remark from 'remark';

function parseMarkdown(markdown) {
  const markdownAST = remark().parse(markdown);

  // NOTE: unwrap from `root` node
  if (markdownAST.children.length === 1) {
    return markdownAST.children[0];
  }

  return {
    type: 'paragraph',
    children: markdownAST.children,
  };
}

export default parseMarkdown;

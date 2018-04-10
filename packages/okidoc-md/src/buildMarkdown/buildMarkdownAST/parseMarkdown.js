import remark from 'remark';

function parseMarkdown(markdown) {
  return remark().parse(markdown);
}

export default parseMarkdown;

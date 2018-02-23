import remark from 'remark';
import remarkHtml from 'remark-html';
import u from 'unist-builder';

function inlineHTML(html) {
  return html.replace(/\n/g, '').replace(/\s{2,}/g, ' ');
}

function cleanupHTML(html) {
  return html.trim().replace(/\n\s*\n/g, '\n');
}

function renderHTML(node) {
  if (!node) {
    return '';
  }

  if (Array.isArray(node)) {
    node = u('root', node);
  }

  return remark()
    .use(remarkHtml)
    .stringify(node);
}

export { inlineHTML, cleanupHTML };

export default renderHTML;

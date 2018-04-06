import remark from 'remark';
import remarkHtml from 'remark-html';
import u from 'unist-builder';

function cleanUpInlineHTML(html) {
  return html
    .trim()
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ');
}

function cleanUpMultilineHTML(html) {
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

function renderInlineHTML(node) {
  return cleanUpInlineHTML(renderHTML(node));
}

function renderMultilineHTML(node) {
  return cleanUpMultilineHTML(renderHTML(node));
}

export { renderInlineHTML, renderMultilineHTML, cleanUpMultilineHTML };

export default renderHTML;

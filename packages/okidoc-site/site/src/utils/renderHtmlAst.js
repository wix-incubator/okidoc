import React, { Fragment } from 'react';
import toH from 'hast-to-hyperscript';

const FRAGMENT_TAG_NAME = '__Fragment__';

function getReactElement(name, components) {
  if (name === FRAGMENT_TAG_NAME) {
    return Fragment;
  }

  if (components && components.hasOwnProperty(name)) {
    return components[name];
  }

  return name;
}

function getReactChildren(name, children) {
  if (['table', 'thead', 'tbody', 'tr', 'td'].indexOf(name) !== -1) {
    // cleanup empty texts from children to prevent react warnings like
    // "Whitespace text nodes cannot appear as a child of table/thead/..."
    return (
      children &&
      children.filter(
        element => typeof element !== 'string' || !!element.trim(),
      )
    );
  }

  return children;
}

/**
 * Compile HAST to React.
 * @param node
 * @param components
 */
function renderHtmlAst(node, { components }) {
  if (node.type === 'root') {
    if (node.children.length === 1 && node.children[0].type === 'element') {
      node = node.children[0];
    } else {
      node = {
        type: 'element',
        tagName: FRAGMENT_TAG_NAME,
        properties: {},
        children: node.children,
      };
    }
  }

  function h(name, props, children) {
    return React.createElement(
      getReactElement(name, components),
      props,
      getReactChildren(name, children),
    );
  }

  return toH(h, node);
}

export default renderHtmlAst;

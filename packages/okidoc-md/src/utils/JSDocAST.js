const COMMENT_BLOCK_TYPE = 'CommentBlock';
const JSDOC_PATTERN = /^\*[^*]+/;

function isJSDocComment(comment) {
  return (
    comment.type === COMMENT_BLOCK_TYPE && JSDOC_PATTERN.test(comment.value)
  );
}

function getJSDocComment(node) {
  const comments = node.leadingComments;

  return comments && comments.find(isJSDocComment);
}

function getJSDocCommentValue(node) {
  const JSDocComment = getJSDocComment(node);

  return JSDocComment && JSDocComment.value;
}

function createCommentBlock(description) {
  return {
    type: COMMENT_BLOCK_TYPE,
    value: description,
  };
}

function createJSDocCommentValue(description = '') {
  description = description
    // remove spaces before asterisk
    .replace(/\n\s*/g, '\n')
    // remove asterisk with line break at end of comment
    .replace(/\*\n$/g, '');

  return description.startsWith('*') ? description : `* ${description}`;
}

function createJSDocCommentBlock(description) {
  return createCommentBlock(createJSDocCommentValue(description));
}

function isJSDocIncludes(node, searchString) {
  const jsDocComment = getJSDocComment(node);

  return !!jsDocComment && jsDocComment.value.includes(searchString);
}

export {
  isJSDocComment,
  getJSDocComment,
  getJSDocCommentValue,
  createJSDocCommentValue,
  createJSDocCommentBlock,
  isJSDocIncludes,
};

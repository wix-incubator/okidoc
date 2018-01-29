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

function createCommentBlock(description) {
  return {
    type: COMMENT_BLOCK_TYPE,
    value: description,
  };
}

function createJSDocComment(description = '') {
  description = description
    // remove spaces before asterisk
    .replace(/\n\s*/g, '\n');

  return description.startsWith('*') ? description : `* ${description}`;
}

function createJSDocCommentBlock(description) {
  return createCommentBlock(createJSDocComment(description));
}

export {
  isJSDocComment,
  getJSDocComment,
  createCommentBlock,
  createJSDocComment,
  createJSDocCommentBlock,
};

import createDocTagParam from './createDocTagParam';
import escapeRegExp from '../utils/escapeRegExp';

function removeDocTagFromJSDocCommentValue(value, docTag) {
  if (!docTag) {
    return value;
  }

  const DOC_TAG_PARAM = escapeRegExp(createDocTagParam(docTag));
  const REPLACE_PATTERN = new RegExp(`\\s*\\*\\s*${DOC_TAG_PARAM}`, 'g');

  return value.replace(REPLACE_PATTERN, '');
}

export default removeDocTagFromJSDocCommentValue;

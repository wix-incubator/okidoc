const REG_EXP_CHAR_PATTERN = /[\\^$.*+?()[\]{}|]/;
const REG_EXP_CHAR_REPLACE_PATTERN = new RegExp(
  REG_EXP_CHAR_PATTERN.source,
  'g',
);

function escapeRegExp(string) {
  return string && REG_EXP_CHAR_PATTERN.test(string)
    ? string.replace(REG_EXP_CHAR_REPLACE_PATTERN, '\\$&')
    : string;
}

export default escapeRegExp;

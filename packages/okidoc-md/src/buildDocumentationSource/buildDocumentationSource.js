import generate from '@babel/generator';

import buildDocumentationSourceAST from './buildDocumentationSourceAST';

function buildDocumentationSource({
  entry,
  source,
  pattern,
  tag,
  visitor,
  interfaces = {},
}) {
  return generate(
    buildDocumentationSourceAST({
      entry,
      source,
      pattern,
      tag,
      visitor,
      interfaces,
    }),
  ).code;
}

export default buildDocumentationSource;

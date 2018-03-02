import generate from '@babel/generator';

import buildDocumentationSourceAST from './buildDocumentationSourceAST';

function buildDocumentationSource({ entry, source, pattern, tag, visitor }) {
  return generate(
    buildDocumentationSourceAST({ entry, source, pattern, tag, visitor }),
  ).code;
}

export default buildDocumentationSource;

import generate from '@babel/generator';

import buildProgram from './utils/buildProgram';
import buildDocumentationMarkdown from './utils/buildDocumentationMarkdown';

function buildDocumentationForCommonTypes(interfaces, { title }) {
  const typesProgramAST = buildProgram(Object.values(interfaces));
  const typesSource = generate(typesProgramAST).code;

  return buildDocumentationMarkdown(typesSource, {
    title: title,
    sourceInfo: 'common types',
  });
}

export default buildDocumentationForCommonTypes;

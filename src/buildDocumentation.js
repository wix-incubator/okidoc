import generate from '@babel/generator';
import documentation from 'documentation';

import buildDocumentationAst from './buildDocumentationAst';
import { buildMarkdown } from './output';

function buildDocumentation({ title, pattern, visitor }) {
  const { code: documentationSource } = generate(
    buildDocumentationAst(pattern, {
      visitor: visitor,
    }),
  );

  return documentation
    .build([{ source: documentationSource }], { shallow: true })
    .then(documentation.formats.json)
    .then(jsonString =>
      buildMarkdown({
        title: title,
        json: JSON.parse(jsonString),
      }),
    );
}

export default buildDocumentation;

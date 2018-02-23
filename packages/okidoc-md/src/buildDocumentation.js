import generate from '@babel/generator';
import documentation from 'documentation';

import buildDocumentationAst from './buildDocumentationAst';
import buildMarkdown from './buildMarkdown';

function buildDocumentation({ title, entry, pattern, tag, visitor }) {
  const { code: documentationSource } = generate(
    buildDocumentationAst({ entry, pattern, tag, visitor }),
  );

  return documentation
    .build([{ source: documentationSource }], { shallow: true })
    .then(comments =>
      buildMarkdown(comments, {
        title: title,
      }),
    );
}

export default buildDocumentation;

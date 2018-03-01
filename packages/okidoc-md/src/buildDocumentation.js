import documentation from 'documentation';

import buildDocumentationSource from './buildDocumentationSource';
import buildMarkdown from './buildMarkdown';

function buildDocumentation({ title, entry, pattern, tag, visitor }) {
  const documentationSource = buildDocumentationSource({
    entry,
    pattern,
    tag,
    visitor,
  });

  return documentation
    .build([{ source: documentationSource }], { shallow: true })
    .then(comments =>
      buildMarkdown(comments, {
        title: title,
      }),
    );
}

export default buildDocumentation;

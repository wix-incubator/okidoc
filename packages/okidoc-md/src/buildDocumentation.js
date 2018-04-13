import documentation from 'documentation';
import { codeFrameColumns } from '@babel/code-frame';

import buildDocumentationSource from './buildDocumentationSource';
import buildMarkdown from './buildMarkdown';

function buildDocumentation({ title, entry, source, pattern, tag, visitor }) {
  const documentationSource = buildDocumentationSource({
    entry,
    source,
    pattern,
    tag,
    visitor,
  });

  return documentation
    .build([{ source: documentationSource }], { shallow: true })
    .then(
      comments =>
        buildMarkdown(comments, {
          title: title,
        }),
      error => {
        if (error.loc) {
          error.codeFrame = codeFrameColumns(documentationSource, {
            start: error.loc,
          });
          error.message += `\n${error.codeFrame}`;
        }

        error.message = `"${title}" documentation source${
          source ? '' : ` (${entry || pattern})`
        } - ${error.message}`;

        throw error;
      },
    );
}

export default buildDocumentation;

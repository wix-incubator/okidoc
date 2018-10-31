import documentation from 'documentation';
import { codeFrameColumns } from '@babel/code-frame';

import buildMarkdown from '../buildMarkdown';

// @todo: redesign contract, remove all cases, just pass smth like context
function buildDocumentationMarkdown(
  documentationSource,
  { title, sourceInfo },
) {
  return documentation
    .build([{ source: documentationSource || ' ' }], { shallow: true })
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
          !sourceInfo ? '' : ` (${sourceInfo})`
        } - ${error.message}`;

        throw error;
      },
    );
}

export default buildDocumentationMarkdown;

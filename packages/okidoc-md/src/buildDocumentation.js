import buildDocumentationSource from './buildDocumentationSource';
import buildDocumentationMarkdown from './utils/buildDocumentationMarkdown';

function buildDocumentation({ title, entry, source, pattern, tag, visitor }) {
  const documentationSource = buildDocumentationSource({
    entry,
    source,
    pattern,
    tag,
    visitor,
  });

  return buildDocumentationMarkdown(documentationSource, {
    title,
    sourceInfo: entry || pattern,
  });
}

export default buildDocumentation;

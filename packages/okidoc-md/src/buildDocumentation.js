import buildDocumentationSource from './buildDocumentationSource';
import buildDocumentationMarkdown from './utils/buildDocumentationMarkdown';

function buildDocumentation({
  title,
  entry,
  source,
  pattern,
  tag,
  visitor,
  interfaces,
  excludeKind = [],
}) {
  const documentationSource = buildDocumentationSource({
    entry,
    source,
    pattern,
    tag,
    visitor,
    interfaces,
  });

  return buildDocumentationMarkdown(documentationSource, {
    title,
    sourceInfo: entry || pattern,
    excludeKind,
  });
}

export default buildDocumentation;

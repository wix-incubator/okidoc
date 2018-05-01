import traverseSource from '../../utils/traverseSource';
import traverseFiles from '../../utils/traverseFiles';
import traverseEntries from '../../utils/traverseEntries';

function ensureSourceOptionsValid({ entry, pattern, source }) {
  if (!entry && !pattern && !source) {
    throw new Error(
      `'entry' or/and 'pattern' or 'source' options should be defined`,
    );
  }

  if (source && (entry || pattern)) {
    throw new Error(
      `if 'source' options provided, 'entry' and 'pattern' should be undefined`,
    );
  }
}

function traverse({ entry, pattern, source }, visitors) {
  ensureSourceOptionsValid({ entry, pattern, source });

  if (source) {
    traverseSource(source, visitors);
    return;
  }

  if (entry) {
    traverseEntries(entry, visitors, { pattern });
    return;
  }

  traverseFiles(pattern, visitors);
}

export default traverse;

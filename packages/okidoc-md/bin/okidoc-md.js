#!/usr/bin/env node

const yaml = require('yamljs');
const util = require('util');
const fs = require('fs');
const path = require('path');
const { buildDocumentation } = require('../lib');

const createFileDirectoryIfNotExists = require('../lib/utils/createFileDirectoryIfNotExists')
  .default;

const writeFile = util.promisify(fs.writeFile);

// NOTE: ignore first 2 arguments (node and path of this file)
const [docsYamlPath, outputDir] = process.argv.slice(2);

const RUN_EXAMPLE = `
  run example:
    '> okidoc ./docs.yml ./docs'
`;

if (!docsYamlPath || !fs.existsSync(docsYamlPath)) {
  throw new Error(
    `docs yaml path should be valid path.
    '${docsYamlPath || ''}' is not exists.
    ${RUN_EXAMPLE}`,
  );
}

if (!outputDir) {
  throw new Error(
    `docs target path not provided.
    ${RUN_EXAMPLE}`,
  );
}

let docs;

try {
  docs = yaml.load(docsYamlPath);
} catch (e) {
  console.error(e);
  throw new Error(
    `invalid docs yaml file. An error occurred while parsing ${docsYamlPath}.`,
  );
}

Promise.all(
  docs.map(doc =>
    buildDocumentation({
      title: doc.title,
      entry: doc.entry,
      pattern: doc.glob,
      tag: doc.tag,
      visitor: doc.visitor,
    }).then(markdown => {
      const markdownPath = path.join(
        outputDir,
        doc.path.endsWith('.md') ? doc.path : doc.path + '.md',
      );

      createFileDirectoryIfNotExists(markdownPath);

      return writeFile(markdownPath, markdown);
    }),
  ),
).catch(err => {
  console.error('An error occurred while building documentation', err);

  process.exit(1);
});

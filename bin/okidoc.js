#!/usr/bin/env node

const yaml = require('yamljs');
const util = require('util');
const fs = require('fs');
const path = require('path');
const {
  buildDocumentation,
  createFileDirectoryIfNotExists,
} = require('../lib');

const writeFile = util.promisify(fs.writeFile);

// NOTE: ignore first 2 arguments (node and path of this file)
const [docsYamlPath, outputDir] = process.argv.slice(2);

const docs = yaml.load(docsYamlPath);

Promise.all(
  docs.map(doc =>
    buildDocumentation({
      title: doc.title,
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
  console.error(err);

  process.exit(1);
});

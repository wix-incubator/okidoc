#!/usr/bin/env node

const yaml = require('yamljs');
const util = require('util');
const fs = require('fs');
const path = require('path');
const { buildDocumentation } = require('../lib');

const writeFile = util.promisify(fs.writeFile);

// NOTE: ignore first 2 arguments (node and path of this file)
const [docsYamlPath, outputDir] = process.argv.slice(2);

const docs = yaml.load(docsYamlPath);

Promise.all(
  docs.map(doc =>
    buildDocumentation({
      title: doc.title,
      pattern: doc.glob,
      visitor: doc.visitor,
    }).then(markdown =>
      writeFile(path.join(outputDir, doc.id + '.md'), markdown),
    ),
  ),
).catch(err => {
  console.error(err);

  process.exit(1);
});

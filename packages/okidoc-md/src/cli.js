import path from 'path';
import buildDocumentation from './buildDocumentation';

import writeFile from './utils/writeFile';
import { colorFgGreen, colorFgCyan } from './utils/consoleUtils';
import yaml from 'yamljs';

function loadConfig(configPath) {
  return new Promise((resolve, reject) => {
    try {
      const docs = yaml.load(configPath);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
}

function runBuildDocumentation(docs, { outputDir }) {
  if (!Array.isArray(docs) || docs.length === 0) {
    return Promise.reject(new Error(`Config is empty or has invalid format.`));
  }

  return Promise.all(
    docs.map(doc => {
      const start = Date.now();
      const markdownPath = path.join(
        outputDir,
        doc.path.endsWith('.md') ? doc.path : doc.path + '.md',
      );

      console.log(`${colorFgGreen('starting')} ${markdownPath}`);

      return buildDocumentation({
        title: doc.title,
        entry: doc.entry,
        pattern: doc.glob,
        tag: doc.tag,
        visitor: doc.visitor,
      })
        .then(markdown => writeFile(markdownPath, markdown))
        .then(() => {
          console.log(
            `${colorFgCyan('finished')} ${markdownPath} ${Date.now() -
              start}ms`,
          );
        });
    }),
  );
}

function runCLI({ configPath, outputDir }) {
  loadConfig(configPath)
    .then(
      docs => runBuildDocumentation(docs, { outputDir }),
      error => {
        console.error(
          `Could not load config '${configPath}': ${error.message}`,
        );
        process.exit(1);
      },
    )
    .catch(error => {
      console.error('An error occurred while building documentation.', error);
      process.exit(1);
    });
}

export default runCLI;

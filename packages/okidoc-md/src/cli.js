import path from 'path';
import fs from 'fs';
import yaml from 'yamljs';

import buildDocumentation from './buildDocumentation';

import writeFile from './utils/writeFile';
import { colorFgGreen, colorFgCyan } from './utils/consoleUtils';

function loadConfig(configPath) {
  // TODO: it could be sync (without promise wrapper)
  return new Promise((resolve, reject) => {
    try {
      const file = fs.readFileSync(configPath, { encoding: 'utf8' });
      const config = yaml.parse(file);

      resolve(config);
    } catch (error) {
      reject(error);
    }
  });
}

function runBuildDocumentation(config, { outputDir }) {
  if (Array.isArray(config)) {
    config = {
      docs: config,
    };

    console.warn('Config format is changed. Read documentation for details');
  }

  if (!config || !Array.isArray(config.docs) || config.docs.length === 0) {
    return Promise.reject(new Error(`Config is empty or has invalid format.`));
  }

  return Promise.all(
    config.docs.map(doc => {
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
  return loadConfig(configPath).then(
    config => runBuildDocumentation(config, { outputDir }),
    error => {
      console.error(`Could not load config '${configPath}': ${error.message}`);
      throw error;
    },
  );
}

export default runCLI;

const fs = require('fs');
const path = require('path');
const recursiveReadDir = require('recursive-readdir-synchronous');

const getExampleFileSlug = require('./getExampleFileSlug');

const componentPath = path.resolve(
  __dirname,
  '../../src/templates/code-example.js',
);

exports.createPages = (
  { boundActionCreators },
  { path: directory, html = '', externalStyles = [], externalScripts = [] },
) => {
  directory = path.resolve(directory);

  const files = recursiveReadDir(directory);

  if (files.length === 0) {
    console.warn(
      `Specified code example directory "${directory}" contains no files`,
    );

    return;
  }

  const { createPage } = boundActionCreators;

  files.forEach(filePath => {
    if (path.extname(filePath) === '.js') {
      const code = fs.readFileSync(filePath, 'utf8');
      const slug = getExampleFileSlug(filePath, directory);

      createPage({
        path: slug,
        component: componentPath,
        layout: 'empty',
        context: {
          code,
          html,
          externalStyles,
          externalScripts,
          // TODO: uncomment when `package.json` `dependencies` ready
          // sandboxLink: createCodeSandboxLink({
          //   code: code,
          //   html: html,
          //   dependencies: dependencies
          // })
        },
      });
    }
  });
};

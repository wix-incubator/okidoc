const { getParameters } = require('codesandbox/lib/api/define');

// https://codesandbox.io/docs/importing/#get-request
function createCodeSandboxLink({ code, html, dependencies }) {
  const parameters = {
    files: {
      'package.json': {
        content: {
          dependencies: dependencies,
        },
      },
      'index.js': {
        content: code,
      },
      'index.html': {
        content: html,
      },
    },
  };

  return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${getParameters(
    parameters,
  )}`;
}

module.exports = createCodeSandboxLink;

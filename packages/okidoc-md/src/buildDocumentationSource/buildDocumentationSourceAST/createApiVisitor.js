import fs from 'fs';
import path from 'path';
import * as visitorApi from '../../api';

function ensureVisitorOptionsValid({ tag, visitorPath }) {
  if (!tag && !visitorPath) {
    throw new Error(`'tag' or 'visitor' options should be defined`);
  }

  if (tag && visitorPath) {
    throw new Error(
      `'tag' or 'visitor' options should be defined, but not both`,
    );
  }
}

function ensureVisitorExists(apiVisitorPath) {
  if (!fs.existsSync(apiVisitorPath)) {
    throw new Error(
      `'visitor' option should be valid js file path. '${apiVisitorPath}' is not exists`,
    );
  }
}

function ensureCreateApiVisitorIsFunction(createCustomApiVisitor) {
  if (typeof createCustomApiVisitor !== 'function') {
    throw new Error(
      `'visitor' file should export function 'createApiVisitor' (exports.createApiVisitor = ...)`,
    );
  }
}

function createApiVisitor({ visitorPath, tag }, enter) {
  ensureVisitorOptionsValid({ tag, visitorPath });

  if (visitorPath) {
    visitorPath = path.resolve(visitorPath);

    ensureVisitorExists(visitorPath);

    const customVisitorApi = require(visitorPath);

    ensureCreateApiVisitorIsFunction(customVisitorApi.createApiVisitor);

    return customVisitorApi.createApiVisitor((path, options) => {
      enter(path, options, {
        createApiClassMethod: customVisitorApi.createApiClassMethod,
        createApiClassProperty: customVisitorApi.createApiClassProperty,
        createApiFunction: customVisitorApi.createApiFunction,
      });
    });
  }

  return visitorApi.createApiVisitor(tag, (path, options) => {
    enter(path, options);
  });
}

export default createApiVisitor;

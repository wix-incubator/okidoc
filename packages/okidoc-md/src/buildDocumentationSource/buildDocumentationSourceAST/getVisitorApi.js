import fs from 'fs';
import path from 'path';
import visitorApi from './visitorApi';

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

function getVisitorApi({ visitorPath, tag }) {
  ensureVisitorOptionsValid({ tag, visitorPath });

  if (visitorPath) {
    visitorPath = path.resolve(visitorPath);

    ensureVisitorExists(visitorPath);

    const customVisitorApi = require(visitorPath);

    ensureCreateApiVisitorIsFunction(customVisitorApi.createApiVisitor);

    return {
      ...visitorApi,
      ...customVisitorApi,
    };
  }

  return {
    ...visitorApi,
    createApiVisitor(enter) {
      return visitorApi.createApiVisitor(tag, enter);
    },
  };
}

export default getVisitorApi;

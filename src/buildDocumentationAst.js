import fs from 'fs';
import path from 'path';
import * as t from '@babel/types';
import glob from './utils/glob';
import traverseFiles from './utils/traverseFiles';
import {
  createApiMethod,
  createApiInterface,
  buildApiClassDeclaration,
} from './api';

function ensureVisitorExists(apiVisitorPath) {
  if (!fs.existsSync(apiVisitorPath)) {
    throw new Error(
      `'visitor' option should be valid js file path. '${apiVisitorPath}' is not exists`,
    );
  }
}

function ensureCreateApiVisitorIsFunction(createApiVisitor) {
  if (typeof createApiVisitor !== 'function') {
    throw new Error(
      `'visitor' file should export function 'createApiMethod' (exports.createApiMethod = ...)`,
    );
  }
}

function buildDocumentationAst(pattern, { visitor: visitorPath, tag } = {}) {
  const files = glob(pattern);
  const apiInterfaces = [];
  const classApiMethods = [];

  // NOTE: read about visitors
  // https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
  // https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js
  const visitors = {
    'InterfaceDeclaration|TSInterfaceDeclaration': path => {
      apiInterfaces.push(createApiInterface(path.node));
    },
  };

  visitorPath = visitorPath && path.resolve(visitorPath);

  if (visitorPath) {
    ensureVisitorExists(visitorPath);

    const {
      createApiVisitor: createCustomApiVisitor,
      createApiMethod: createCustomApiMethod,
    } = require(visitorPath);

    ensureCreateApiVisitorIsFunction(createCustomApiVisitor);

    Object.assign(
      visitors,
      createCustomApiVisitor(path => {
        if (t.isClassMethod(path.node || t.isClassProperty(path.node))) {
          classApiMethods.push(
            typeof createCustomApiMethod === 'function'
              ? createCustomApiMethod(path.node)
              : createApiMethod(path.node),
          );
        }
      }),
    );
  }

  if (tag) {
  }

  traverseFiles(files, visitors);

  const apiClassDeclaration = buildApiClassDeclaration(classApiMethods);

  return {
    type: 'Program',
    body: apiInterfaces.concat(apiClassDeclaration),
  };
}

export default buildDocumentationAst;

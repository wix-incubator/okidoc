import fs from 'fs';
import path from 'path';
import * as t from '@babel/types';
import glob from './utils/glob';
import traverseFiles from './utils/traverseFiles';
import {
  createApiVisitor,
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

function ensureCreateApiVisitorIsFunction(createCustomApiVisitor) {
  if (typeof createCustomApiVisitor !== 'function') {
    throw new Error(
      `'visitor' file should export function 'createApiVisitor' (exports.createApiVisitor = ...)`,
    );
  }
}

function ensureCustomApiVisitorIsCorrect(
  visitors,
  customApiVisitor,
  visitorPath,
) {
  const visitorsKeys = Object.keys(visitors);
  const customApiVisitorKeys = Object.keys(customApiVisitor);
  const intersection = customApiVisitorKeys.filter(key =>
    visitorsKeys.includes(key),
  );

  if (intersection.length) {
    console.error(
      `default config visitors ${JSON.stringify(
        intersection,
      )} are overridden by config from 'visitor.createApiVisitor' (${visitorPath})`,
    );
  }
}

function buildDocumentationAst(pattern, { tag, visitor: visitorPath }) {
  const files = glob(pattern);
  const apiInterfaces = [];
  const classApiMethods = [];
  const functions = [];

  if (files.length === 0) {
    console.warn(`files not found for ${pattern} pattern`);
  }

  if (!tag && !visitorPath) {
    throw new Error(
      `'tag' or/and 'visitor' options should be defined ('${pattern}')`,
    );
  }

  // NOTE: read about visitors
  // https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
  // https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js
  const visitors = {
    'InterfaceDeclaration|TSInterfaceDeclaration': path => {
      apiInterfaces.push(createApiInterface(path.node));
    },
  };

  if (tag) {
    Object.assign(
      visitors,
      createApiVisitor(tag, path => {
        if (t.isClassMethod(path.node || t.isClassProperty(path.node))) {
          classApiMethods.push(createApiMethod(path.node, tag));
        }
        if (
          t.isVariableDeclaration(path.node) ||
          t.isFunctionDeclaration(path.node)
        ) {
          functions.push(createApiMethod(path.node, tag));
        }
      }),
    );
  }

  if (visitorPath) {
    visitorPath = path.resolve(visitorPath);

    ensureVisitorExists(visitorPath);

    const {
      createApiVisitor: createCustomApiVisitor,
      createApiMethod: createCustomApiMethod,
    } = require(visitorPath);

    ensureCreateApiVisitorIsFunction(createCustomApiVisitor);

    const customApiVisitor = createCustomApiVisitor(path => {
      if (t.isClassMethod(path.node || t.isClassProperty(path.node))) {
        classApiMethods.push(
          typeof createCustomApiMethod === 'function'
            ? createCustomApiMethod(path.node)
            : createApiMethod(path.node),
        );
      }
    });

    ensureCustomApiVisitorIsCorrect(visitors, customApiVisitor, visitorPath);

    Object.assign(visitors, customApiVisitor);
  }

  traverseFiles(files, visitors);

  const apiClassDeclaration = buildApiClassDeclaration(classApiMethods);

  return {
    type: 'Program',
    body: apiInterfaces.concat(apiClassDeclaration, functions),
  };
}

export default buildDocumentationAst;

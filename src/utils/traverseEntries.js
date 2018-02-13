import path from 'path';
import precinct from 'precinct';
import cabinet from 'filing-cabinet';
import traverse from '@babel/traverse';

import parseFile from './parseFile';
import { isMatchGlob } from './glob';

const EXCLUDE_PATTERN = /\.(css|sass|scss|svg|png|jpg|dot|graphql)$/;

function resolveDependencyPath({ dependency, entryPath, entryAST }) {
  const config = {
    filename: entryPath,
    directory: process.cwd(),
    ast: entryAST,
  };

  return (
    cabinet({ ...config, partial: dependency }) ||
    cabinet({ ...config, partial: dependency + '/index' })
  );
}

function traverseEntry(entryPath, visitors, { pattern, visited = [] } = {}) {
  const entryAST = parseFile(entryPath);

  visited.push(entryPath);

  precinct(entryAST, { type: 'es6', es6: { mixedImports: true } }).forEach(
    dependency => {
      // NOTE: only internal dependencies
      // TODO: allow path alias aka webpack alias https://webpack.js.org/configuration/resolve/#resolve-alias
      // https://github.com/dependents/node-filing-cabinet#usage
      if (!dependency.startsWith('.')) {
        return;
      }

      const dependencyPath = resolveDependencyPath({
        dependency,
        entryPath,
        entryAST,
      });

      if (!dependencyPath) {
        // NOTE: don't warn if dependency is not `js` or `ts`
        if (!EXCLUDE_PATTERN.test(dependency)) {
          console.warn(
            `could not find '${dependency}' or '${dependency +
              '/index'}' dependency for '${entryPath}'`,
          );
        }
        return;
      }

      // NOTE: prevent circular traverse
      if (
        visited.includes(dependencyPath) ||
        (pattern && !isMatchGlob(dependencyPath, pattern))
      ) {
        return;
      }

      // TODO: traverse only imported declarations (skip declarations from dependency, which not used in current entry)
      // something like:
      // ```
      // let imports = [];
      // traverse(entryAST, {
      //   ImportDeclaration(path) {
      //     if (path.node.source.value === dependency) {
      //       imports = getNamedImports(path.node.specifiers)
      //     }
      //   }
      // });
      // traverseEntry(dependencyPath, visitors, { pattern, visited, includeExported: imports });
      // ```
      traverseEntry(dependencyPath, visitors, { pattern, visited });
    },
  );

  // TODO: ensure declarations are exported before add to doc
  traverse(entryAST, visitors);
}

function traverseEntries(entry, visitors, { pattern }) {
  const entries = Array.isArray(entry) ? entry : [entry];

  if (entries.some(_entry => typeof _entry !== 'string')) {
    throw new Error(`'entry' prop should be 'string' or array of 'string'`);
  }

  entries.forEach(entry => {
    traverseEntry(path.resolve(entry), visitors, {
      pattern: pattern,
    });
  });
}

export default traverseEntries;

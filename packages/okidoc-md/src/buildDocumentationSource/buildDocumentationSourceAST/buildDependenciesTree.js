import path from 'path';
import precinct from 'precinct';
import cabinet from 'filing-cabinet';
import babelTraverse from '@babel/traverse';
import parseFile from '../../utils/parseFile';
import parseSource from '../../utils/parseSource';
import glob, { isMatchGlob } from '../../utils/glob';

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

function resolveDependencies({ entryAST, entryPath, pattern }) {
  const relativeDependencies = precinct(entryAST, {
    type: 'es6',
    es6: { mixedImports: true },
  });

  return relativeDependencies
    .map(dependency => {
      // NOTE: only internal dependencies
      // TODO: allow path alias aka webpack alias https://webpack.js.org/configuration/resolve/#resolve-alias
      // https://github.com/dependents/node-filing-cabinet#usage
      if (!dependency.startsWith('.')) {
        return;
      }

      // convert relative path to absolute
      const dependencyPath = resolveDependencyPath({
        dependency,
        entryAST,
        entryPath,
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

      if (pattern && !isMatchGlob(dependencyPath, pattern)) {
        return;
      }

      return dependencyPath;
    })
    .filter(path => !!path);
}

function extractDependenciesFromAST({ fileAST, filePath }) {
  const dependencies = new Map();
  const interfaces = [];

  babelTraverse(fileAST, {
    TSInterfaceDeclaration: path => {
      interfaces.push(path.node);
    },
    // In order to implement CommonJS support can use https://github.com/dependents/node-detective-cjs
    ImportDeclaration: path => {
      // TODO: prevent traverse for files without filePath in more efficient and elegant way
      if (!filePath) {
        return;
      }
      const relativePath = path.node.source.value;
      // convert relative path to absolute
      const absolutePath = resolveDependencyPath({
        dependency: relativePath,
        entryAST: fileAST,
        entryPath: filePath,
      });
      const specifiers = [
        ...(dependencies.get(absolutePath) || []),
        ...path.node.specifiers,
      ];

      dependencies.set(absolutePath, specifiers);
    },
  });

  return {
    dependencies,
    interfaces,
  };
}

function buildDependenciesFromEntry({ entry, pattern, storage = new Map() }) {
  const entries = Array.isArray(entry) ? entry : [entry];

  if (entries.some(_entry => typeof _entry !== 'string')) {
    throw new Error(`'entry' prop should be 'string' or array of 'string'`);
  }

  entries.forEach(entry => {
    const filePath = path.resolve(entry);

    if (!storage.has(filePath)) {
      const fileAST = parseFile(filePath);
      // extract interfaces & imports
      const { dependencies, interfaces } = extractDependenciesFromAST({
        fileAST,
        filePath,
      });

      // save
      storage.set(filePath, { dependencies, fileAST, interfaces });

      // traverse recursively
      buildDependenciesFromEntry({
        entry: resolveDependencies({
          entryAST: fileAST,
          entryPath: filePath,
          pattern,
        }),
        storage,
      });
    }
  });
  return storage;
}

function buildDependenciesFromSource({ source, storage = new Map() }) {
  const fileAST = parseSource(source);
  const { dependencies, interfaces } = extractDependenciesFromAST({ fileAST });
  storage.set('__source', { dependencies, fileAST, interfaces });
  return storage;
}

function buildDependenciesFromPattern({ pattern }) {
  const files = glob(pattern);

  if (files.length === 0) {
    console.warn(`files not found for ${pattern} pattern`);
    return;
  }

  return buildDependenciesFromEntry({ entry: files });
}

function ensureSourceOptionsValid({ entry, pattern, source }) {
  if (!entry && !pattern && !source) {
    throw new Error(
      `'entry' or/and 'pattern' or 'source' options should be defined`,
    );
  }

  if (source && (entry || pattern)) {
    throw new Error(
      `if 'source' options provided, 'entry' and 'pattern' should be undefined`,
    );
  }
}

function buildDependenciesTree({ entry, pattern, source }) {
  ensureSourceOptionsValid({ entry, pattern, source });

  if (entry) {
    return buildDependenciesFromEntry({ entry, pattern });
  }

  if (source) {
    return buildDependenciesFromSource({ source });
  }

  return buildDependenciesFromPattern({ pattern });
}

export default buildDependenciesTree;

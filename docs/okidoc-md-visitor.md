---
title: 'Custom api visitor'
layout: simple
---

# Custom api visitor

To extract api methods with custom rule use `visitor` prop in `docs.yml` and visitor code:

```yaml
- path: public-methods.md
  title: Public Methods
  glob: src/**/*.js
  visitor: path/to/visitor/myApiVisitor.js
```

```js
// myApiVisitor.js

function createApiVisitor(enter) {
  return {
    Decorator(path) {
      if (isPublicApiDecorator(path.node)) {
        enter(path.parentPath);
      }
    },
  };
}

function createApiClassMethod(nodeFromVisitor) {
  // return ast of cleaned up method with JSDoc and empty body
}

module.exports = {
  createApiVisitor,
  createApiClassMethod,
};
```

Custom visitor example:

- [playerApiVisitor](https://github.com/wix/playable/blob/master/scripts/documentation/playerApiVisitor.js)

Read about visitors:

- https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
- https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js

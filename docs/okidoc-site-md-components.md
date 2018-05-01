---
title: "React components inside markdown"
layout: simple
---

# React components inside markdown

To use react components inside markdown, create components map and `mdComponents` prop inside `./site.yml`:

```yaml
# ./site.yml
...
mdComponents:
  # path to react components map
  path: ./docs/playground-components.js

  # [optional] links to external styles. Will be added to html head.
  externalStyles:
    - https://example.com/component@1.10.2/dist/component.css

  # [optionsl] links to external scripts. Will be added to end of html body.
  externalScripts:
    - https://example.com/component@1.10.2/dist/component.bundle.min.js
...
```

> `path` should be valid path to `js` file which could be handled by default [gatsby](https://www.gatsbyjs.org/) config.

```js
// ./docs/playground-components.js

import React from 'react';

function Demo1() {
  return <span>!DEMO1!</span>;
}

function Demo2() {
  return <span>!DEMO2!</span>;
}

export default {
  demo1: Demo1,
  demo2: Demo2,
};
```

> NOTE: You could use [css modules](https://www.gatsbyjs.org/tutorial/part-two/#css-modules) and [sass](https://www.gatsbyjs.org/packages/gatsby-plugin-sass/) with your react components inside md.

Then use components in any `md` file:

```md
<!-- index.md -->

# Demo

<demo1></demo1>

<demo2></demo2>
```

> NOTE:
> md components logic is inspired by [rehype-react](https://using-remark.gatsbyjs.org/custom-components/),
> and based on [hast-to-hyperscript](https://github.com/syntax-tree/hast-to-hyperscript),
> so has the same caveats.

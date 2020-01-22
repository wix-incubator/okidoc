---
title: "Documentation site navigation"
layout: simple
---

# Documentation site navigation

To configure your site navigation, use the config `navigation` field:

```yaml
navigation:
 - path: /config
   title: Configuration
 - path: /methods
   title: Methods
```

> the `path` property defines path to the markdown file (without `.md` extension) inside `./docs` directory

To add nested items to a parent navigation item, use the `items` prop:

```yaml
navigation:
  - title: Editor
    items:
      - path: /pages
        title: Pages
      ...
  - title: Document
    items:
      - path: /components
        title: Components
      - title: Config
        items:
          ...
```

> if a nested `items` array is not provided, then a `path` property is required

---
title: "Documentation site navigation"
layout: simple
---

# Documentation site navigation

To configure your site navigation, use config `navigation` field:

```yaml
navigation:
 - path: /config
   title: Configuration
 - path: /methods
   title: Methods
```

> `path` property is path to markdown file (without `.md` extension) inside `./docs` directory

To add nested items on navigation item, use `items` prop:

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

> if nested `items` array not provided on navigation item, `path` property is required

## Define markdown files

You can combine auto-generated markdown files with those you created manually. Markdown should be written in [gfm](https://github.github.com/gfm/) format.

Each markdown file can be annotated with a YAML front matter. Here is a basic example:

```yaml
---
title: 'okidoc'
layout: simple
include:
  - ./partial/api.md
---
# My super API

After this line the contents of `api.md` will be included.
```

Supported properties:

|    OPTION | VALUE                                                                                                                                                                    |
| --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   `title` | Title for a page in the `<title>` tag.                                                                                                                                 |
|  `layout` | Optionally define or override layout to use. Available layouts: `two-column` - default layout, code examples are shown on the right side. `simple` - one column layout. |
| `include` | A list of markdown files to be included after content in current markdown file.                                                                                 |

## Define markdown files

You can combine auto generated markdown files with manually created. Markdown should be written in [gfm](https://github.github.com/gfm/) format.

Each markdown file can be annotated with YAML front matter. Here is a basic example:

```yaml
---
title: 'okidoc'
layout: simple
include:
  - ./partial/api.md
---
# My super API

After this line content from `api.md` will be included.
```

Supported properties:

|    OPTION | VALUE                                                                                                                                                                    |
| --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   `title` | The title for the page in `<title>` tag.                                                                                                                                 |
|  `layout` | Optionally define or override the layout to use. Available layouts: `two-column` - default layout, code examples are shown on right side.. `simple` - one column layout. |
| `include` | List of markdown files that will be included after content in the current markdown file.                                                                                 |

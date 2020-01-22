## Generate documentation

### Define what to document

Add `@doc TAG_NAME` [JSDoc](http://usejsdoc.org) tags to your classes or functions

```typescript
/**
 * My Super UI
 * @doc UI
 */
class MySuperUI {
  /**
   * show UI
   * @example
   * mySuperUI.show();
   */
  show() {}
}

/**
 * Subscribe on event
 * @param eventName - name of event
 * @param fn - event listener fn
 * @doc Events
 */
function subscribe(eventName: string, fn: Function) {}
```

### Configure

Add a yaml config (default config path is `./docs.yml`):

```yaml
# Get files using `entry` or/and `glob` (could be `.js` or `.ts` files),
# find api methods by searching for `@doc UI` JSDoc tags and generate markdown into a `partial/ui.md` file.
- path: partial/ui.md
  title: UI API Methods
  # [optional] if provided, only `entry` file dependencies will be parsed
  entry: src/index.ts
  # [optional] required if `entry` is not provided
  glob: src/**/*.ts
  # tag name has to match `@doc UI` in JSDoc
  tag: UI

- path: partial/events.md
  title: Events API
  glob: src/**/*.ts
  tag: Events
```

> NOTE: With the `entry` option specified, all source code of the dependency file will be parsed, not just the imported/exported part.

### Execute

Run the `okidoc-md` script.

```sh
$ okidoc-md ./docs.yml ./docs
```

This will generate the docs markdown using configuration from `./docs.yml` and put them into `./docs` directory.

> NOTE: `./docs.yml` and `./docs` are default values for `configPath` and `outputDir` arguments, respectively, and can be omitted.
> Run `okidoc-md --help` for help.

To extract api methods with a custom rule, use [visitor prop](./okidoc-md-visitor) in `docs.yml`

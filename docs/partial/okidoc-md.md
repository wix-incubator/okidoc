## Generate documentation

Add `@doc TAG_NAME` tag to [JSDoc](http://usejsdoc.org) of class or function

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

Add yaml config (default config path is `./docs.yml`):

```yaml
# Get files using `entry` or/and `glob` (could be `.js` or `.ts` files),
# find api methods by `@doc UI` tag in JSDoc and generate markdown to `partial/ui.md` file.
- path: partial/ui.md
  title: UI API Methods
  # [optional] if provided, only `entry` file dependencies will be parsed
  entry: src/index.ts
  # [optional] required if `entry` not provided
  glob: src/**/*.ts
  # tag name have to match `@doc UI` in JSDoc
  tag: UI

- path: partial/events.md
  title: Events API
  glob: src/**/*.ts
  tag: Events
```

> NOTE: With `entry` option, all dependency file source will be parsed for doc. Not only imported/exported part.

Run `okidoc-md` script

```sh
$ okidoc-md ./docs.yml ./docs
```

It will generates docs markdown using configuration from `./docs.yml` and put them to `./docs` directory

> NOTE: `./docs.yml` and `./docs` are default values for `configPath` and `outputDir` arguments and can be omitted.
> Run `okidoc-md --help` for help.

To extract api methods with custom rule use [visitor prop](./okidoc-md-visitor) in `docs.yml`

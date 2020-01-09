webpackJsonp([0x62fe288d0170],{336:function(n,a){n.exports={data:{site:{siteMetadata:{navigation:[{path:"/",title:"Home"}]}},page:{frontmatter:{layout:null,title:"",include:null},headings:[{depth:1,value:"okidoc"},{depth:2,value:"Installation"},{depth:2,value:"Generate documentation"},{depth:2,value:"Customize documentation generation"},{depth:2,value:"Markdown files"},{depth:2,value:"Build documentation site"},{depth:2,value:"Deploy documentation site"}],html:'<h1 id="okidoc"><a href="#okidoc" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>okidoc</h1>\n<p>Documentation tool</p>\n<h2 id="installation"><a href="#installation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Installation</h2>\n<p>Install using the <a href="https://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer">npm</a> package manager:</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code class="language-sh">$ npm install okidoc --save-dev</code></pre>\n      </div>\n<p>This installs package and put two commands in your <code>./node_modules/.bin</code> path:</p>\n<ul>\n<li><code>okidoc-md</code> - generate human-readable documentation <code>md</code> files using source code with <a href="http://usejsdoc.org" target="_blank" rel="nofollow noopener noreferrer">JSDoc</a> and public method markers</li>\n<li><code>okidoc-site</code> - run and build documentation site based on <code>md</code> files and site config</li>\n</ul>\n<p>You can use these commands in your <a href="https://docs.npmjs.com/misc/scripts#examples" target="_blank" rel="nofollow noopener noreferrer">npm scripts</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n  <span class="token property">"documentation"</span><span class="token operator">:</span> <span class="token string">"okidoc-md ./docs.yml ./docs"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:gitadd"</span><span class="token operator">:</span> <span class="token string">"npm run documentation &amp;&amp; git add ./docs"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:site"</span><span class="token operator">:</span> <span class="token string">"okidoc-site develop ./site.yml"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:site:build"</span><span class="token operator">:</span> <span class="token string">"npm run documentation &amp;&amp; okidoc-site build ./site.yml"</span><span class="token punctuation">,</span>\n  <span class="token property">"precommit"</span><span class="token operator">:</span> <span class="token string">"npm run documentation:gitadd"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2 id="generate-documentation"><a href="#generate-documentation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Generate documentation</h2>\n<p>Add <code>@doc TAG_NAME</code> tag to <a href="http://usejsdoc.org" target="_blank" rel="nofollow noopener noreferrer">JSDoc</a> of class or class method</p>\n<div class="gatsby-highlight">\n      <pre class="language-typescript"><code class="language-typescript"><span class="token comment">/**\n * My Super UI\n * @doc UI\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">MySuperUI</span> <span class="token punctuation">{</span>\n  <span class="token comment">/**\n   * show UI\n   * @example\n   * mySuperUI.show();\n   */</span>\n  <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n  <span class="token comment">/**\n   * hide UI\n   */</span>\n  <span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">MySuperUIEvents</span> <span class="token punctuation">{</span>\n  <span class="token comment">/**\n   * Add an event listener\n   * @param eventName\n   * @param fn\n   * @doc Events\n   */</span>\n  <span class="token function">on</span><span class="token punctuation">(</span>eventName<span class="token punctuation">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fn<span class="token punctuation">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n  <span class="token comment">/**\n   * Remove an event listener\n   * @param eventName\n   * @param fn\n   * @doc Events\n   */</span>\n  <span class="token function">off</span><span class="token punctuation">(</span>eventName<span class="token punctuation">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fn<span class="token punctuation">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Add yaml config (for example <code>docs.yml</code>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token comment"># Get files using `entry` or/and `glob` (could be `.js` or `.ts` files),</span>\n<span class="token comment"># find api methods by `@doc UI` tag in JSDoc and generate markdown to `partial/ui.md` file.</span>\n<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> partial/ui.md\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> UI API Methods\n  <span class="token comment"># [optional] if provided, only `entry` file dependencies will be parsed</span>\n  <span class="token key atrule">entry</span><span class="token punctuation">:</span> src/index.ts\n  <span class="token comment"># [optional] required if `entry` not provided</span>\n  <span class="token key atrule">glob</span><span class="token punctuation">:</span> src/**/*.ts\n  <span class="token comment"># tag name have to match `@doc UI` in JSDoc</span>\n  <span class="token key atrule">tag</span><span class="token punctuation">:</span> UI\n\n<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> partial/events.md\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> Events API\n  <span class="token key atrule">glob</span><span class="token punctuation">:</span> src/**/*.ts\n  <span class="token key atrule">tag</span><span class="token punctuation">:</span> Events\n</code></pre>\n      </div>\n<blockquote>\n<p>NOTE: With <code>entry</code> option, all dependency file source will be parsed for doc. Not only imported/exported part.</p>\n</blockquote>\n<p>Run <code>okidoc-md</code> script</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code class="language-sh"># generate markdown docs using configuration from `./docs.yml` and put them to `./docs` directory\nokidoc-md ./docs.yml ./docs</code></pre>\n      </div>\n<h2 id="customize-documentation-generation"><a href="#customize-documentation-generation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Customize documentation generation</h2>\n<p>To extract api methods with custom rule use <code>visitor</code> prop in <code>docs.yml</code> and visitor code:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> public<span class="token punctuation">-</span>methods.md\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> Public Methods\n  <span class="token key atrule">glob</span><span class="token punctuation">:</span> src/**/*.js\n  <span class="token key atrule">visitor</span><span class="token punctuation">:</span> path/to/visitor/myApiVisitor.js\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// myApiVisitor.js</span>\n\n<span class="token keyword">function</span> <span class="token function">createApiVisitor</span><span class="token punctuation">(</span>enter<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token function">Decorator</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPublicApiDecorator</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span>node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">enter</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span>parentPath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">createApiClassMethod</span><span class="token punctuation">(</span>nodeFromVisitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// return ast of cleaned up method with JSDoc and empty body</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  createApiVisitor<span class="token punctuation">,</span>\n  createApiClassMethod<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Main visitor example:</p>\n<ul>\n<li><a href="https://github.com/wix/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiVisitor.js" target="_blank" rel="nofollow noopener noreferrer">createApiVisitor</a></li>\n<li><a href="https://github.com/wix/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiClassMethod.js" target="_blank" rel="nofollow noopener noreferrer">createApiClassMethod</a></li>\n</ul>\n<p>Custom visitor example:</p>\n<ul>\n<li><a href="https://github.com/wix/playable/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiVisitor.js" target="_blank" rel="nofollow noopener noreferrer">createApiVisitor</a></li>\n<li><a href="https://github.com/wix/playable/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiMethod.js" target="_blank" rel="nofollow noopener noreferrer">createApiClassMethod</a></li>\n</ul>\n<p>Read about visitors:</p>\n<ul>\n<li><a href="https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors" target="_blank" rel="nofollow noopener noreferrer">https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors</a></li>\n<li><a href="https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js" target="_blank" rel="nofollow noopener noreferrer">https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js</a></li>\n</ul>\n<h2 id="markdown-files"><a href="#markdown-files" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Markdown files</h2>\n<p>You can combine auto generated markdown files with manually created. Markdown should be written in <a href="https://github.github.com/gfm/" target="_blank" rel="nofollow noopener noreferrer">gfm</a> format.</p>\n<p>Each markdown file can be annotated with YAML front matter. Here is a basic example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token punctuation">---</span>\n<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"okidoc"</span>\n<span class="token key atrule">layout</span><span class="token punctuation">:</span> simple\n<span class="token key atrule">include</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> ./partial/api.md\n<span class="token punctuation">---</span>\n\n<span class="token comment"># My super API</span>\n\nAfter this line content from `api.md` will be included.\n</code></pre>\n      </div>\n<p>Supported properties:</p>\n<table>\n<thead>\n<tr>\n<th align="right">OPTION</th>\n<th>VALUE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="right"><code>title</code></td>\n<td>The title for the page in \n<code>&#x3C;title></code>\n tag.</td>\n</tr>\n<tr>\n<td align="right"><code>layout</code></td>\n<td>Optionally define or override the layout to use. Available layouts: \n<code>two-column</code>\n - default layout, code examples are shown on right side.. \n<code>simple</code>\n - one column layout.</td>\n</tr>\n<tr>\n<td align="right"><code>include</code></td>\n<td>List of markdown files that will be included after content in the current markdown file.</td>\n</tr>\n</tbody>\n</table>\n<h2 id="build-documentation-site"><a href="#build-documentation-site" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Build documentation site</h2>\n<p>Site logic is based on <a href="https://www.gatsbyjs.org/docs/" target="_blank" rel="nofollow noopener noreferrer">gatsby</a>.</p>\n<p>Instead of default gatsby directory <code>src/pages</code>, <strong>use your docs path</strong> (<a href="https://github.com/wix/playable/blob/25d9d506c3d640b9cbd614d4e9b476390ada51b9/docs/" target="_blank" rel="nofollow noopener noreferrer">example</a>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">.\n├── site.yml\n├── /docs/                      # Site markdown files\n│   ├── /index.md               # [required] site index page\n│   ├── /other-markdown-file.md\n│   └── ...                     # Other markdown files\n└── ...</code></pre>\n      </div>\n<blockquote>\n<p>IMPORTANT: For site index page use <code>index.md</code> file\n(<a href="https://github.com/wix/playable/blob/25d9d506c3d640b9cbd614d4e9b476390ada51b9/docs/index.md" target="_blank" rel="nofollow noopener noreferrer">example</a>).\nIt is <strong>required</strong> file in your documentation directory.\nOther pages are available by file name without <code>.md</code> extension.</p>\n</blockquote>\n<blockquote>\n<p>Only <code>md</code> files are served by <code>okidoc-site</code>.</p>\n</blockquote>\n<p>To configure your site, use yaml config (for example <code>site.yml</code>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token comment"># Markdown files path</span>\n<span class="token comment"># put index.md with content for site index page</span>\n<span class="token key atrule">docsPath</span><span class="token punctuation">:</span> ./docs\n\n<span class="token comment"># [optional] path for site build. Default path is `./site`</span>\n<span class="token key atrule">distPath</span><span class="token punctuation">:</span> ./sitedist\n\n<span class="token key atrule">config</span><span class="token punctuation">:</span>\n <span class="token comment"># [optional] site metadata (https://www.gatsbyjs.org/docs/gatsby-config/#sitemetadata)</span>\n <span class="token key atrule">siteMetadata</span><span class="token punctuation">:</span>\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_TITLE\n   <span class="token key atrule">description</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_DESCRIPTION\n   <span class="token key atrule">keywords</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_KEYWORDS\n <span class="token comment"># [optional] path prefix</span>\n <span class="token key atrule">pathPrefix</span><span class="token punctuation">:</span> /my<span class="token punctuation">-</span>awesome<span class="token punctuation">-</span>lib\n <span class="token comment"># [optional] algolia apiKey and indexName for docsearch (https://www.algolia.com/ref/docsearch). If empty, search will be hidden</span>\n <span class="token key atrule">algoliaApiKey</span><span class="token punctuation">:</span> YOUR_ALGOLIA_API_KEY\n <span class="token key atrule">algoliaIndexName</span><span class="token punctuation">:</span> YOUR_ALGOLIA_INDEX_NAME\n <span class="token comment"># [optional] Link to your github repository</span>\n <span class="token key atrule">githubLink</span><span class="token punctuation">:</span> YOUR_GITHUB_REPOSITORY\n\n<span class="token comment"># [optional] navigation config. Use if you need more than one page in navigation block</span>\n<span class="token key atrule">navigation</span><span class="token punctuation">:</span>\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /config\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Configuration\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /methods\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Methods\n</code></pre>\n      </div>\n<p>Run <code>okidoc-site</code> script</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code class="language-sh"># site will start a hot-reloading development environment accessible at localhost:8000\nokidoc-site develop ./site.yml\n\n# will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.\nokidoc-site build ./site.yml</code></pre>\n      </div>\n<p>Read gatsby <a href="https://www.gatsbyjs.org/docs/" target="_blank" rel="nofollow noopener noreferrer">docs</a> for more information</p>\n<h2 id="deploy-documentation-site"><a href="#deploy-documentation-site" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Deploy documentation site</h2>\n<p>If you use github for your repository, the easiest way to deploy site is to use <a href="https://github.com/tschaub/gh-pages" target="_blank" rel="nofollow noopener noreferrer">gh-pages</a> library:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n  <span class="token property">"documentation:site:build"</span><span class="token operator">:</span> <span class="token string">"npm run documentation &amp;&amp; okidoc-site build ./site.yml"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:site:deploy"</span><span class="token operator">:</span> <span class="token string">"npm run documentation:site:build &amp;&amp; gh-pages -d site"</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>For more deploy options read gatsby <a href="https://www.gatsbyjs.org/docs/deploy-gatsby/" target="_blank" rel="nofollow noopener noreferrer">docs</a></p>'}},pathContext:{slug:"/README/"}}}});
//# sourceMappingURL=path---readme-8c4b62a6413038bb424c.js.map
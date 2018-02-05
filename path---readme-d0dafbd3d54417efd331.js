webpackJsonp([0x62fe288d0170],{345:function(n,a){n.exports={data:{site:{siteMetadata:{navigation:[{path:"/",title:"Home"}]}},page:{frontmatter:{layout:null,title:"",include:null},headings:[{depth:1,value:"okidoc"},{depth:2,value:"Installation"},{depth:2,value:"Generate documentation"},{depth:3,value:"Customization"},{depth:2,value:"Build documentation site"}],html:'<h1 id="okidoc"><a href="#okidoc" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>okidoc</h1>\n<p>Documentation tool</p>\n<h2 id="installation"><a href="#installation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Installation</h2>\n<p>Install using the <a href="https://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer">npm</a> package manager:</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code>$ npm install @wix/okidoc --save-dev</code></pre>\n      </div>\n<p>This installs package and put two commands in your <code>./node_modules/.bin</code> path:</p>\n<ul>\n<li><code>okidoc</code> - generate human-readable documentation <code>md</code> files using source code with <a href="http://usejsdoc.org" target="_blank" rel="nofollow noopener noreferrer">JSDoc</a> and public method markers</li>\n<li><code>okidoc-site</code> - run and build documentation site based on <code>md</code> files and site config</li>\n</ul>\n<p>You can use these commands in your <a href="https://docs.npmjs.com/misc/scripts#examples" target="_blank" rel="nofollow noopener noreferrer">npm scripts</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n  <span class="token property">"documentation"</span><span class="token operator">:</span> <span class="token string">"okidoc ./docs/docs.yml ./docs"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:gitadd"</span><span class="token operator">:</span> <span class="token string">"npm run documentation &amp;&amp; git add ./docs"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:site"</span><span class="token operator">:</span> <span class="token string">"okidoc-site develop ./docs/site.yml"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:site:build"</span><span class="token operator">:</span> <span class="token string">"npm run documentation &amp;&amp; okidoc-site build ./docs/site.yml"</span><span class="token punctuation">,</span>\n  <span class="token property">"documentation:site:deploy"</span><span class="token operator">:</span> <span class="token string">"npm run documentation:site:build &amp;&amp; gh-pages -d sitedist"</span><span class="token punctuation">,</span>\n  <span class="token property">"precommit"</span><span class="token operator">:</span> <span class="token string">"npm run documentation:gitadd"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2 id="generate-documentation"><a href="#generate-documentation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Generate documentation</h2>\n<p>Add <code>@doc TAG_NAME</code> tag to <a href="http://usejsdoc.org" target="_blank" rel="nofollow noopener noreferrer">JSDoc</a> of class or class method</p>\n<div class="gatsby-highlight">\n      <pre class="language-typescript"><code><span class="token comment">/**\n * My Super UI\n * @doc UI\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">MySuperUI</span> <span class="token punctuation">{</span>\n  <span class="token comment">/**\n   * show UI\n   */</span>\n  <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n  <span class="token comment">/**\n   * hide UI\n   */</span>\n  <span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">MySuperUIEvents</span> <span class="token punctuation">{</span>\n  <span class="token comment">/**\n   * Add an event listener\n   * @param eventName\n   * @param fn\n   * @doc Events\n   */</span>\n  <span class="token function">on</span><span class="token punctuation">(</span>eventName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> fn<span class="token punctuation">:</span> <span class="token keyword">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n  <span class="token comment">/**\n   * Remove an event listener\n   * @param eventName\n   * @param fn\n   * @doc Events\n   */</span>\n  <span class="token function">off</span><span class="token punctuation">(</span>eventName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> fn<span class="token punctuation">:</span> <span class="token keyword">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Add yaml config (for example <code>docs.yml</code>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code><span class="token comment"># get files using `glob` `src/**/*.ts` (could be js or ts files),</span>\n<span class="token comment"># find api methods by `@doc UI` tag in JSDoc</span>\n<span class="token comment"># and generate markdown to `partial/ui.md` file</span>\n<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> partial/ui.md\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> UI API Methods\n  <span class="token key atrule">glob</span><span class="token punctuation">:</span> src/**/*.ts\n  <span class="token key atrule">tag</span><span class="token punctuation">:</span> UI\n\n<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> partial/events.md\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> Events API\n  <span class="token key atrule">glob</span><span class="token punctuation">:</span> src/**/*.ts\n  <span class="token key atrule">tag</span><span class="token punctuation">:</span> Events\n</code></pre>\n      </div>\n<p>Run <code>okidoc</code> script</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code># generate markdown docs using configuration from `./docs.yml` and put them to `./docs` directory\nokidoc ./docs.yml ./docs</code></pre>\n      </div>\n<h3 id="customization"><a href="#customization" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Customization</h3>\n<p>To extract api methods with custom rule use <code>visitor</code> prop in <code>docs.yml</code> and visitor code:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> public<span class="token punctuation">-</span>methods.md\n  <span class="token key atrule">title</span><span class="token punctuation">:</span> Public Methods\n  <span class="token key atrule">glob</span><span class="token punctuation">:</span> src/**/*.js\n  <span class="token key atrule">visitor</span><span class="token punctuation">:</span> path/to/visitor/myApiVisitor.js\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// myApiVisitor.js</span>\n\n<span class="token keyword">function</span> <span class="token function">createApiVisitor</span><span class="token punctuation">(</span>enter<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token function">Decorator</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPublicApiDecorator</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span>node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">enter</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span>parentPath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">createApiMethod</span><span class="token punctuation">(</span>nodeFromVisitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// return ast of cleaned up method with JSDoc and empty body</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  createApiVisitor<span class="token punctuation">,</span>\n  createApiMethod<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Main visitor example:</p>\n<ul>\n<li><a href="https://github.com/wix-private/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiVisitor.js" target="_blank" rel="nofollow noopener noreferrer">createApiVisitor</a></li>\n<li><a href="https://github.com/wix-private/okidoc/blob/35fe46cb14e4cf4026a0c6d305e9a908ea33ecbf/src/api/createApiMethod.js" target="_blank" rel="nofollow noopener noreferrer">createApiMethod</a></li>\n</ul>\n<p>Custom visitor example:</p>\n<ul>\n<li><a href="https://github.com/wix-private/video-player.js/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiVisitor.js" target="_blank" rel="nofollow noopener noreferrer">createApiVisitor</a></li>\n<li><a href="https://github.com/wix-private/video-player.js/blob/4ec54f1e06ab8b35bffc00dce2291c18a10446c5/scripts/documentation/lib/player/createPlayerApiMethod.js" target="_blank" rel="nofollow noopener noreferrer">createApiMethod</a></li>\n</ul>\n<p>Read about visitors:</p>\n<ul>\n<li><a href="https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors" target="_blank" rel="nofollow noopener noreferrer">https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors</a></li>\n<li><a href="https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js" target="_blank" rel="nofollow noopener noreferrer">https://github.com/babel/babel/blob/master/packages/babel-traverse/src/visitors.js</a></li>\n</ul>\n<h2 id="build-documentation-site"><a href="#build-documentation-site" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Build documentation site</h2>\n<p>Site logic is based on <a href="https://www.gatsbyjs.org/docs/" target="_blank" rel="nofollow noopener noreferrer">gatsby</a>.\nInstead of default gatsby directory <code>src/pages</code> use your docs path. Only <code>md</code> files are served by <code>okidoc-site</code>.</p>\n<p>For site index page use <code>index.md</code> file\n(<a href="https://github.com/wix-private/wix-vod/blob/6b06510eedc8774d563871d018f5aacdce0b332b/wix-vod-sdk/docs/index.md" target="_blank" rel="nofollow noopener noreferrer">example</a>).\nIt is required file in your documentation directory.\nOther pages are available by file name without <code>.md</code> extension.</p>\n<p>To configure your site, use yaml config (for example <code>site.yml</code>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code><span class="token comment"># Markdown files path</span>\n<span class="token comment"># put index.md with content for site index page</span>\n<span class="token key atrule">docsPath</span><span class="token punctuation">:</span> ./docs\n\n<span class="token comment"># [optional] path for site build. Default path is `./site`</span>\n<span class="token key atrule">distPath</span><span class="token punctuation">:</span> ./sitedist\n\n<span class="token key atrule">config</span><span class="token punctuation">:</span>\n <span class="token comment"># [optional] site metadata (https://www.gatsbyjs.org/docs/gatsby-config/#sitemetadata)</span>\n <span class="token key atrule">siteMetadata</span><span class="token punctuation">:</span>\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_TITLE\n <span class="token comment"># [optional] path prefix</span>\n <span class="token key atrule">pathPrefix</span><span class="token punctuation">:</span> /my<span class="token punctuation">-</span>awesome<span class="token punctuation">-</span>lib\n <span class="token comment"># [optional] algolia apiKey for docsearch (https://www.algolia.com/ref/docsearch). If empty, search will be hidden</span>\n <span class="token key atrule">algoliaApiKey</span><span class="token punctuation">:</span> YOUR_ALGOLIA_API_KEY\n <span class="token comment"># [optional] Link to your github repository</span>\n <span class="token key atrule">githubLink</span><span class="token punctuation">:</span> YOUR_GITHUB_REPOSITORY\n\n<span class="token comment"># [optional] navigation config. Use if you need more than one page</span>\n<span class="token key atrule">navigation</span><span class="token punctuation">:</span>\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /player<span class="token punctuation">-</span>config\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Configuration\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /video<span class="token punctuation">-</span>source\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Video source\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /api\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> API reference\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /modules\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Modules\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /events\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Player events\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /adapters\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Playback adapters\n</code></pre>\n      </div>\n<p>Run <code>okidoc-site</code> script</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code># site will start a hot-reloading development environment accessible at localhost:8000\nokidoc-site develop ./site.yml\n\n# will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.\nokidoc-site build ./site.yml</code></pre>\n      </div>\n<p>Read gatsby <a href="https://www.gatsbyjs.org/docs/" target="_blank" rel="nofollow noopener noreferrer">docs</a> for more information</p>'}},pathContext:{slug:"/README/"}}}});
//# sourceMappingURL=path---readme-d0dafbd3d54417efd331.js.map
webpackJsonp([27951987534347],{343:function(n,a){n.exports={data:{site:{siteMetadata:{navigation:[{path:"/",title:"okidoc"}]}},page:{frontmatter:{layout:null,title:"",include:null},headings:[{depth:2,value:"Build documentation site"}],html:'<h2 id="build-documentation-site"><a href="#build-documentation-site" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Build documentation site</h2>\n<p>Site logic is based on <a href="https://www.gatsbyjs.org/docs/" target="_blank" rel="nofollow noopener noreferrer">gatsby</a>.</p>\n<p>Instead of default gatsby directory <code>src/pages</code>, <strong>use your docs path</strong> (<a href="https://github.com/wix/playable/tree/master/docs" target="_blank" rel="nofollow noopener noreferrer">example</a>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">.\n├── site.yml\n├── /docs/                      # Site markdown files\n│   ├── /index.md               # [required] site index page\n│   ├── /other-markdown-file.md\n│   └── ...                     # Other markdown files\n└── ...</code></pre>\n      </div>\n<blockquote>\n<p>IMPORTANT: For site index page use <code>index.md</code> file\n(<a href="https://github.com/wix/playable/tree/master/docs/index.md" target="_blank" rel="nofollow noopener noreferrer">example</a>).\nIt is <strong>required</strong> file in your documentation directory.\nOther pages are available by file name without <code>.md</code> extension.</p>\n</blockquote>\n<blockquote>\n<p>Only <code>md</code> files are served by <code>okidoc-site</code>.</p>\n</blockquote>\n<p>To configure your site, use yaml config (for example <code>site.yml</code>):</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token comment"># Markdown files path</span>\n<span class="token comment"># put index.md with content for site index page</span>\n<span class="token key atrule">docsPath</span><span class="token punctuation">:</span> ./docs\n\n<span class="token comment"># [optional] path for site build. Default path is `./site`</span>\n<span class="token key atrule">distPath</span><span class="token punctuation">:</span> ./sitedist\n\n<span class="token key atrule">config</span><span class="token punctuation">:</span>\n <span class="token comment"># [optional] site metadata (https://www.gatsbyjs.org/docs/gatsby-config/#sitemetadata)</span>\n <span class="token key atrule">siteMetadata</span><span class="token punctuation">:</span>\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_TITLE\n   <span class="token key atrule">description</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_DESCRIPTION\n   <span class="token key atrule">keywords</span><span class="token punctuation">:</span> YOUR_DOCUMENTATION_SITE_KEYWORDS\n <span class="token comment"># [optional] path prefix</span>\n <span class="token key atrule">pathPrefix</span><span class="token punctuation">:</span> /my<span class="token punctuation">-</span>awesome<span class="token punctuation">-</span>lib\n <span class="token comment"># [optional] algolia apiKey and indexName for docsearch (https://www.algolia.com/ref/docsearch). If empty, search will be hidden</span>\n <span class="token key atrule">algoliaApiKey</span><span class="token punctuation">:</span> YOUR_ALGOLIA_API_KEY\n <span class="token key atrule">algoliaIndexName</span><span class="token punctuation">:</span> YOUR_ALGOLIA_INDEX_NAME\n <span class="token comment"># [optional] Link to your github repository</span>\n <span class="token key atrule">githubLink</span><span class="token punctuation">:</span> YOUR_GITHUB_REPOSITORY\n\n<span class="token comment"># [optional] navigation config. Use if you need more than one page in navigation block</span>\n<span class="token key atrule">navigation</span><span class="token punctuation">:</span>\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /config\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Configuration\n <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /methods\n   <span class="token key atrule">title</span><span class="token punctuation">:</span> Methods\n</code></pre>\n      </div>\n<p>Run <code>okidoc-site</code> script</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code class="language-sh">$ okidoc-site develop ./site.yml</code></pre>\n      </div>\n<p>Site will start a hot-reloading development environment accessible at localhost:8000</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code class="language-sh">$ okidoc-site build ./site.yml</code></pre>\n      </div>\n<p>Will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.</p>\n<p>Read gatsby <a href="https://www.gatsbyjs.org/docs/" target="_blank" rel="nofollow noopener noreferrer">docs</a> for more information</p>'}},pathContext:{slug:"/partial/okidoc-site/"}}}});
//# sourceMappingURL=path---partial-okidoc-site-d1688affd8c504d2457d.js.map
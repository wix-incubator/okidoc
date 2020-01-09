webpackJsonp([0x69bc9312522c],{370:function(e,t){e.exports={data:{site:{siteMetadata:{title:"okidoc"}},page:{frontmatter:{layout:null,title:"",include:null},headings:[{depth:2,value:"Generate documentation"}],htmlAst:{type:"root",children:[{type:"element",tagName:"h2",properties:{id:"generate-documentation"},children:[{type:"element",tagName:"a",properties:{href:"#generate-documentation",ariaHidden:!0,className:["anchor"]},children:[{type:"element",tagName:"svg",properties:{ariaHidden:"true",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{type:"element",tagName:"path",properties:{fillRule:"evenodd",d:"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"},children:[]}]}]},{type:"text",value:"Generate documentation"}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Add "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"@doc TAG_NAME"}]},{type:"text",value:" tag to "},{type:"element",tagName:"a",properties:{href:"http://usejsdoc.org",target:"_blank",rel:["nofollow","noopener","noreferrer"]},children:[{type:"text",value:"JSDoc"}]},{type:"text",value:" of class or function"}]},{type:"text",value:"\n"},{type:"element",tagName:"div",properties:{className:["gatsby-highlight"]},children:[{type:"text",value:"\n      "},{type:"element",tagName:"pre",properties:{className:["language-typescript"]},children:[{type:"element",tagName:"code",properties:{className:["language-typescript"]},children:[{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"/**\n * My Super UI\n * @doc UI\n */"}]},{type:"text",value:"\n"},{type:"element",tagName:"span",properties:{className:["token","keyword"]},children:[{type:"text",value:"class"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","class-name"]},children:[{type:"text",value:"MySuperUI"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"{"}]},{type:"text",value:"\n  "},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"/**\n   * show UI\n   * @example\n   * mySuperUI.show();\n   */"}]},{type:"text",value:"\n  "},{type:"element",tagName:"span",properties:{className:["token","function"]},children:[{type:"text",value:"show"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"("}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:")"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"{"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"}"}]},{type:"text",value:"\n"},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"}"}]},{type:"text",value:"\n\n"},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"/**\n * Subscribe on event\n * @param eventName - name of event\n * @param fn - event listener fn\n * @doc Events\n */"}]},{type:"text",value:"\n"},{type:"element",tagName:"span",properties:{className:["token","keyword"]},children:[{type:"text",value:"function"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","function"]},children:[{type:"text",value:"subscribe"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"("}]},{type:"text",value:"eventName"},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","builtin"]},children:[{type:"text",value:"string"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:","}]},{type:"text",value:" fn"},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","builtin"]},children:[{type:"text",value:"Function"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:")"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"{"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"}"}]}]}]},{type:"text",value:"\n      "}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Add yaml config (default config path is "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"./docs.yml"}]},{type:"text",value:"):"}]},{type:"text",value:"\n"},{type:"element",tagName:"div",properties:{className:["gatsby-highlight"]},children:[{type:"text",value:"\n      "},{type:"element",tagName:"pre",properties:{className:["language-yaml"]},children:[{type:"element",tagName:"code",properties:{className:["language-yaml"]},children:[{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# Get files using `entry` or/and `glob` (could be `.js` or `.ts` files),"}]},{type:"text",value:"\n"},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# find api methods by `@doc UI` tag in JSDoc and generate markdown to `partial/ui.md` file."}]},{type:"text",value:"\n"},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"-"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"path"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" partial/ui.md\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"title"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" UI API Methods\n  "},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# [optional] if provided, only `entry` file dependencies will be parsed"}]},{type:"text",value:"\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"entry"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" src/index.ts\n  "},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# [optional] required if `entry` not provided"}]},{type:"text",value:"\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"glob"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" src/**/*.ts\n  "},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# tag name have to match `@doc UI` in JSDoc"}]},{type:"text",value:"\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"tag"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" UI\n\n"},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:"-"}]},{type:"text",value:" "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"path"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" partial/events.md\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"title"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" Events API\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"glob"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" src/**/*.ts\n  "},{type:"element",tagName:"span",properties:{className:["token","key","atrule"]},children:[{type:"text",value:"tag"}]},{type:"element",tagName:"span",properties:{className:["token","punctuation"]},children:[{type:"text",value:":"}]},{type:"text",value:" Events"}]}]},{type:"text",value:"\n      "}]},{type:"text",value:"\n"},{type:"element",tagName:"blockquote",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"NOTE: With "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"entry"}]},{type:"text",value:" option, all dependency file source will be parsed for doc. Not only imported/exported part."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Run "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"okidoc-md"}]},{type:"text",value:" script"}]},{type:"text",value:"\n"},{type:"element",tagName:"div",properties:{className:["gatsby-highlight"]},children:[{type:"text",value:"\n      "},{type:"element",tagName:"pre",properties:{className:["language-sh"]},children:[{type:"element",tagName:"code",properties:{className:["language-sh"]},children:[{type:"text",value:"$ okidoc-md ./docs.yml ./docs"}]}]},{type:"text",value:"\n      "}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"It will generates docs markdown using configuration from "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"./docs.yml"}]},{type:"text",value:" and put them to "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"./docs"}]},{type:"text",value:" directory"}]},{type:"text",value:"\n"},{type:"element",tagName:"blockquote",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"NOTE: "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"./docs.yml"}]},{type:"text",value:" and "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"./docs"}]},{type:"text",value:" are default values for "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"configPath"}]},{type:"text",value:" and "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"outputDir"}]},{type:"text",value:" arguments and can be omitted.\nRun "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"okidoc-md --help"}]},{type:"text",value:" for help."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"To extract api methods with custom rule use "},{type:"element",tagName:"a",properties:{href:"./okidoc-md-visitor"},children:[{type:"text",value:"visitor prop"}]},{type:"text",value:" in "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"docs.yml"}]}]}],data:{quirksMode:!1}}}},pathContext:{slug:"/partial/okidoc-md/"}}}});
//# sourceMappingURL=path---partial-okidoc-md-04972ccc7517df68837f.js.map
const React = require("react");

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  { externalStyles, externalScripts },
) => {
  if (externalStyles && externalStyles.length) {
    const stylesToLoad = externalStyles.map((src, i) => (
      <link
        key={`doc-components-external-styles-${i}`}
        rel="stylesheet"
        href={src}
      />
    ));

    setHeadComponents(stylesToLoad);
  }

  if (externalScripts && externalScripts.length) {
    const scriptsToLoad = externalScripts.map((src, i) => (
      <script key={`doc-components-external-scripts-${i}`} src={src} />
    ));

    setPostBodyComponents(scriptsToLoad);
  }
};

import React from 'react';

function CodePenButton({
  className,
  code,
  html,
  externalStyles,
  externalScripts,
  children,
}) {
  // https://blog.codepen.io/documentation/api/prefill/
  return (
    <form action="https://codepen.io/pen/define" method="POST" target="_blank">
      <input
        type="hidden"
        name="data"
        value={JSON.stringify({
          editors: '001',
          css_external: externalStyles && externalStyles.join(';'),
          js_external: externalScripts && externalScripts.join(';'),
          js_pre_processor: 'babel',
          js: code,
          html: html,
        })}
      />
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}

function JSFiddleButton({
  className,
  code,
  html,
  externalStyles,
  externalScripts,
  children,
}) {
  const resources = [];

  if (externalStyles) {
    resources.push(...externalStyles);
  }

  if (externalScripts) {
    resources.push(...externalScripts);
  }

  // http://doc.jsfiddle.net/api/post.html
  return (
    <form
      action="http://jsfiddle.net/api/post/library/pure/"
      method="POST"
      target="_blank"
    >
      <input type="hidden" name="js" value={code} />
      <input type="hidden" name="html" value={html} />
      {resources.length > 0 && (
        <input type="hidden" name="resources" value={resources.join(',')} />
      )}
      <input type="hidden" name="wrap" value="l" />
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}

export { CodePenButton, JSFiddleButton };

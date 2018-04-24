function appendExternalScripts(documentBody, externalScripts = []) {
  return Promise.all(
    externalScripts.map(externalScriptUrl => {
      const externalScript = document.createElement('script');

      externalScript.src = externalScriptUrl;

      documentBody.appendChild(externalScript);

      return new Promise(resolve => {
        externalScript.addEventListener('load', resolve);
      });
    }),
  );
}

export default appendExternalScripts;

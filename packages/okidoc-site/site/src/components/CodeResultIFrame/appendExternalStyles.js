function appendExternalStyles(documentBody, externalStyles = []) {
  return Promise.all(
    externalStyles.map(externalLinkUrl => {
      const externalLink = document.createElement('link');

      externalLink.rel = 'stylesheet';
      externalLink.href = externalLinkUrl;

      documentBody.appendChild(externalLink);

      return new Promise(resolve => {
        externalLink.addEventListener('load', resolve);
      });
    }),
  );
}

export default appendExternalStyles;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import appendExternalStyles from './appendExternalStyles';
import appendExternalScripts from './appendExternalScripts';

class CodeResultIFrame extends Component {
  componentDidMount() {
    const { html, code, externalStyles, externalScripts } = this.props;
    const iframeBody = this.iframe.contentWindow.document.body;

    iframeBody.innerHTML = html;

    Promise.all([
      appendExternalStyles(iframeBody, externalStyles),
      appendExternalScripts(iframeBody, externalScripts),
    ]).then(() => {
      const codeScript = document.createElement('script');

      codeScript.textContent = code;

      iframeBody.appendChild(codeScript);
    });
  }

  render() {
    return (
      <iframe
        ref={iframe => {
          this.iframe = iframe;
        }}
        width="100%"
        height="100%"
        frameBorder={0}
      />
    );
  }
}

CodeResultIFrame.propTypes = {
  code: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  externalStyles: PropTypes.arrayOf(PropTypes.string),
  externalScripts: PropTypes.arrayOf(PropTypes.string),
};

export default CodeResultIFrame;

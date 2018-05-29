import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import '../../assets/stylesheets/prism.scss';

function Code({ code, language }) {
  return (
    <pre className={`language-${language}`}>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.languages[language]
            ? Prism.highlight(code, Prism.languages[language])
            : code,
        }}
      />
    </pre>
  );
}

Code.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

Code.defaultProps = {
  language: 'none',
};

export default Code;

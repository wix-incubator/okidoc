import React from 'react';
import PropTypes from 'prop-types';

import CodeExample from '../components/CodeExample';

function Template({ pathContext }) {
  return (
    <CodeExample
      code={pathContext.code}
      html={pathContext.html}
      externalStyles={pathContext.externalStyles}
      externalScripts={pathContext.externalScripts}
      // sandboxLink={pathContext.sandboxLink}
    />
  );
}

Template.propTypes = {
  pathContext: PropTypes.shape({
    code: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
    externalStyles: PropTypes.arrayOf(PropTypes.string),
    externalScripts: PropTypes.arrayOf(PropTypes.string),
    // sandboxLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default Template;

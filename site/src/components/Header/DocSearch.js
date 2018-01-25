import React, { Component } from 'react';
import 'docsearch.js/dist/npm/styles/main.scss';

const apiKey = process.env.GATSBY_ALGOLIA_API_KEY;

class DocSearch extends Component {
  componentDidMount() {
    if (!apiKey) {
      return;
    }

    // NOTE: use require to fix gatsby build.
    // https://www.gatsbyjs.org/docs/debugging-html-builds/
    const docSearch = require('docsearch.js');

    docSearch({
      apiKey: apiKey,
      indexName: 'wix',
      inputSelector: '#input-search-custom',
      debug: false, // Set debug to true if you want to inspect the dropdown
    });
  }

  render() {
    return apiKey ? (
      <div className="search">
        <input
          type="text"
          className="search"
          id="input-search-custom"
          placeholder="Search"
        />
      </div>
    ) : null;
  }
}

export default DocSearch;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CodePenButton, JSFiddleButton } from './sandboxButtons';
import Code from '../Code';
import CodeResultIFrame from '../CodeResultIFrame';

import styles from './CodeExample.module.scss';

const Tabs = {
  JS: 'JS',
  RESULT: 'RESULT',
};

class CodeExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: Tabs.JS,
    };

    this.onShowJS = this.onShowJS.bind(this);
    this.onShowResult = this.onShowResult.bind(this);
  }

  onShowJS() {
    this.setState({
      currentTab: Tabs.JS,
    });
  }

  onShowResult() {
    this.setState({
      currentTab: Tabs.RESULT,
    });
  }

  render() {
    const { currentTab } = this.state;
    const { code, html, externalStyles, externalScripts } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.actions}>
          <button
            type="button"
            className={classNames(styles.actionButton, {
              [styles.actionButtonActive]: currentTab === Tabs.JS,
            })}
            onClick={this.onShowJS}
          >
            JavaScript
          </button>
          <button
            type="button"
            className={classNames(styles.actionButton, {
              [styles.actionButtonActive]: currentTab === Tabs.RESULT,
            })}
            onClick={this.onShowResult}
          >
            Result
          </button>
          <div className={styles.sandboxButtons}>
            {/* TODO: use codesandbox link, when package published to global npm
            <a href={sandboxLink} target="_blank">
              Edit
            </a>
            */}
            <JSFiddleButton
              className={styles.sandboxButton}
              code={code}
              html={html}
              externalStyles={externalStyles}
              externalScripts={externalScripts}
            >
              Open in jsfiddle
            </JSFiddleButton>
            <CodePenButton
              className={styles.sandboxButton}
              code={code}
              html={html}
              externalStyles={externalStyles}
              externalScripts={externalScripts}
            >
              Open in codepen
            </CodePenButton>
          </div>
        </div>
        <div className={styles.tabs}>
          <div
            className={classNames(styles.tab, {
              [styles.tabActive]: currentTab === Tabs.JS,
            })}
          >
            <Code code={code} language="javascript" />
          </div>
          <div
            className={classNames(styles.tab, {
              [styles.tabActive]: currentTab === Tabs.RESULT,
            })}
          >
            <CodeResultIFrame
              code={code}
              html={html}
              externalStyles={externalStyles}
              externalScripts={externalScripts}
            />
          </div>
        </div>
      </div>
    );
  }
}

CodeExample.propTypes = {
  code: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  externalStyles: PropTypes.arrayOf(PropTypes.string),
  externalScripts: PropTypes.arrayOf(PropTypes.string),
};

export default CodeExample;

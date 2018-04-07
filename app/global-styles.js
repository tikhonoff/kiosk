import { injectGlobal } from 'styled-components';

// globally
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/beagle.min.css';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #00AC55;
  }

  body.fontLoaded {
    font-family: 'PT Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.manager {
    background-color: #f1f1f1;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    >div {
      height: 100%;
    }
  }

  p,
  label {
    line-height: 1.5em;
  }

  .medium-editor-element {
    outline: none;
    border: 3px solid #000;
    padding: 25px;
    margin-bottom: 25px;

    blockquote {
      border-left: 3px solid #ddd;
      margin: 0;
      padding-left: 25px;
    }
  }
`;

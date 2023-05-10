import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import App from './App';
import './index.css';

ReactDOM.render(
  <SpeechProvider appId="6d1ab73b-8fd7-43dc-886b-06c573aac77e" language="en-US">
    <App />
  </SpeechProvider>,
  document.getElementById('root'),
);

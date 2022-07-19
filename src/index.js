import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import { Provider } from './context/context';
import App from './App';
import './index.css';

ReactDOM.render(
    <SpeechProvider appId="2214ec3b-eb2b-49a5-b42c-b18660dd02f0" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>
    ,document.getElementById('root'),
);
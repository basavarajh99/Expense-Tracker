import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context/context';
import App from './App';
import './index.css';

//It's the only time you are accessing the real DOM.
ReactDOM.render(

    <Provider>
        <App />
    </Provider>

    , document.getElementById('root'),
);
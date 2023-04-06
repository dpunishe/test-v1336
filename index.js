import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import {Provider} from 'react-redux';
import {store} from './src/store';

const root = document.getElementById('root');

const render = () => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

render();
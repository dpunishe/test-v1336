import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import {Provider} from 'react-redux';
import {store} from '../store';

const root = document.getElementById('root');

const render = () => {
  ReactDOM.createRoot(root).render(
      <Provider store={store}>
        <App />
      </Provider>
  );
};

render();
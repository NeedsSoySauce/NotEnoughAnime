import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/stylesheet.css';
import registerServiceWorker from './registerServiceWorker';
import { AppRouter } from './router';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

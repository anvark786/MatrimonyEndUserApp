import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global styles
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

// Mount the app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Register the service worker to enable PWA features
serviceWorkerRegistration.register();

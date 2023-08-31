import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global styles
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Add the theme class to the root element
ReactDOM.render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

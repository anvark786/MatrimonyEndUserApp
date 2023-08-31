import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './components/routes/MainRoutes';
import './App.css';
import ToastProvider from './components/common/ToastProvider';

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="App">
          {/* Include header, sidebar, etc. */}
          <MainRoutes />
          {/* Include footer */}
        </div>
      </ToastProvider>

    </Router>
  );
}

export default App;
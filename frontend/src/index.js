// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// import { PostProvider } from './contexts/PostContext';
import App from './App';
// import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>

        <App />

      </AuthProvider>
    </Router>
  </React.StrictMode>
);

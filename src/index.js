import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NameList from './NameList.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NameList />
  </React.StrictMode>
);

// Clean CRA web vitals removed for a streamlined build

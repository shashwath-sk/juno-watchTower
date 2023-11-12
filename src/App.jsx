import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Dashboard, PageNotFound} from './pages'
import { OnProgress } from './components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnProgress />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

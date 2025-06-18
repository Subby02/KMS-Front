// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/stdClubPage/RegisterPage.jsx';
import SearchClubPage from './pages/stdClubPage/SearchClubPage.jsx';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchClubPage />} />
      </Routes>
    </div>
  );
};

export default App;

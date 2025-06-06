// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/stdClubPage/RegisterPage.jsx';
import SearchClubPage from './pages/stdClubPage/SearchClubPage.jsx';
import EnrolEducationPage from './pages/educationPage/EnrolEducationPage.jsx';
import SearchEducationPage from './pages/educationPage/SearchEducationPage.jsx';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchClubPage />} />
        <Route path="/education/enrol" element={<EnrolEducationPage />} />
        <Route path="/education/search" element={<SearchEducationPage />} />
      </Routes>
    </div>
  );
};

export default App;

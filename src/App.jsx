// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/stdClubPage/RegisterPage.jsx';
import SearchClubPage from './pages/stdClubPage/SearchClubPage.jsx';
import ScheduleRegisterPage from './pages/schedulePage/ScheduleRegisterPage';
import ScheduleViewPage from './pages/schedulePage/ScheduleViewPage';


const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchClubPage />} />
        <Route path="/schedule/register" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/view" element={<ScheduleViewPage />} />
      </Routes>
    </div>
  );
};

export default App;

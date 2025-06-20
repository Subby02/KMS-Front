import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/stdClubPage/RegisterPage.jsx";
import SearchClubPage from "./pages/stdClubPage/SearchClubPage.jsx";
import EnrolEducationPage from "./pages/educationPage/EnrolEducationPage.jsx";
import SearchEducationPage from "./pages/educationPage/SearchEducationPage.jsx";
import RegisterTaskPage from "./pages/taskPage/RegisterTaskPage.jsx";
import SearchTaskPage from "./pages/taskPage/SearchTaskPage.jsx";
import Header from "./components/Header";
import ScheduleRegisterPage from "./pages/schedulePage/ScheduleRegisterPage.jsx";
import ScheduleViewPage from "./pages/schedulePage/ScheduleViewPage.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchClubPage />} />
        <Route path="/education/enrol" element={<EnrolEducationPage />} />
        <Route path="/education/search" element={<SearchEducationPage />} />
        <Route path="/task/register" element={<RegisterTaskPage />} />
        <Route path="/task/search" element={<SearchTaskPage />} />
        <Route path="/schedule/register" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/view" element={<ScheduleViewPage />} />
      </Routes>
    </div>
  );
};

export default App;
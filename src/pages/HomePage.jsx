// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>homepage</h1>
      <div>
        <Link to="/register"><button style={{ marginRight: '10px' }}>동아리 등록</button></Link>
        <Link to="/search"><button>동아리 조회</button></Link>
        <Link to="/schedule/register"><button style={{ marginRight: '10px' }}>일정 등록</button></Link>
        <Link to="/schedule/view"><button style={{ marginRight: '10px' }}>일정 조회</button></Link>
      </div>
    </div>
  );
};

export default HomePage;

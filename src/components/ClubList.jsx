// components/ClubList.jsx
import React from 'react';
import '../styles/ClubList.css';

const ClubList = ({ clubs }) => {
  return (
    <div className="club-list">
      <h2>동아리 목록</h2>
      {clubs.length === 0 ? (
        <p>아직 등록된 동아리가 없습니다.</p>
      ) : (
        <ul>
          {clubs.map((club, index) => (
            <li key={index}>
              <strong>{club.name}</strong> - {club.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClubList;

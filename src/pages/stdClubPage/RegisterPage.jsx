// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import ClubForm from '../../components/ClubForm';

const RegisterPage = () => {
  const [clubs, setClubs] = useState([]);

  const handleAddClub = (club) => {
    setClubs([...clubs, club]);
    alert('동아리가 등록되었습니다.');
  };

  return (
    <div>
      <h2>동아리 등록</h2>
      <ClubForm onAddClub={handleAddClub} />
    </div>
  );
};

export default RegisterPage;

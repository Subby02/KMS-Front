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
      <ClubForm onAddClub={handleAddClub} />
    </div>
  );
};

export default RegisterPage;

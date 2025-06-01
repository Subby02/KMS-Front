// src/pages/ListPage.jsx
import React, { useState } from 'react';
import ClubList from '../../components/ClubList';

const SearcgClubPage = () => {
  const [clubs] = useState([]); 

  return (
    <div>
      <h2>동아리 목록</h2>
      <ClubList clubs={clubs} />
    </div>
  );
};

export default SearcgClubPage;
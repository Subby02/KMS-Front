import React, { useState } from 'react';
import ClubList from '../../components/ClubList';

const SearcgClubPage = () => {
  const [clubs] = useState([]);

  return (
    <div style={{ paddingTop: '80px', textAlign: 'center' }}>
      <ClubList clubs={clubs} />
    </div>
  );
};

export default SearcgClubPage;

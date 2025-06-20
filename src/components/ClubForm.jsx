import React, { useState } from 'react';
import '../styles/ClubForm.css';

const ClubForm = () => {
  const [clubName, setClubName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [description, setDescription] = useState('');
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clubName.trim() || !managerName.trim() ) {
      setModalType('error');
      setModalMessage('필수 입력 정보를 모두 입력하세요.'); 
      return;
    }

    const requestBody = {
      stdClubName: clubName,
      stdClubInfo: description,
      stdClubManagerName: managerName,
    };

    try {
      const response = await fetch('http://localhost:8080/stdClub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setModalType('success');
        setModalMessage('학습동아리 등록에 성공했습니다.');
        setClubName('');
        setManagerName('');
        setDescription('');
      } else {
        setModalType('error');
        setModalMessage('학습동아리 등록에 실패했습니다.'); 
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      setModalType('error');
      setModalMessage('학습동아리 등록에 실패했습니다.'); 
    }
  };

  const closeModal = () => {
    setModalType(null);
    setModalMessage('');
  };

  return (
    <div className="form-container">
      <h2>학습동아리 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>학습동아리명</label>
        <input
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />

        <label>관리자 이름</label>
        <input
          type="text"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
        />

        <label>학습동아리 설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">등록</button>
      </form>

      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubForm;

 



import React, { useState } from 'react';
import '../styles/ClubForm.css';

const ClubForm = () => {
  const [clubName, setClubName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [description, setDescription] = useState('');
  const [modalType, setModalType] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clubName.trim() || !managerName.trim()) {
      setModalType('error');
    } else {
      setModalType('success');
      setClubName('');
      setManagerName('');
      setDescription('');
    }
  };

  const closeModal = () => setModalType(null);

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

        <label>학습동아리 관리자명</label>
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
          <div
            className={`modal-content ${modalType}`}
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              {modalType === 'success'
                ? '학습동아리 등록에 성공했습니다.'
                : '필수 입력 정보를 모두 입력하세요.'}
            </p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubForm;

import React, { useState } from 'react';
import '../styles/CircleForm.css';

export default function CircleForm({ empId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const trimmedName = name.trim(), trimmedDesc = description.trim();
    if (!trimmedName || !trimmedDesc) {
      setModalType('error'); setModalMessage('모든 항목을 입력해주세요.'); setModalOpen(true); return;
    }
    try {
      const res = await fetch('http://localhost:8080/circle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, description: trimmedDesc, createdBy: empId })
      });
      if (!res.ok) throw new Error();
      setModalType('success'); setModalMessage(`동호회 "${trimmedName}" 등록 완료!`);
      setName(''); setDescription('');
    } catch {
      setModalType('error'); setModalMessage('등록 중 오류 발생');
    }
    setModalOpen(true);
  };

  return (
    <div className="circle-form-container">
      <h2>동호회 등록</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="circleName">이름</label>
        <input id="circleName" value={name} onChange={e => setName(e.target.value)} required />
        <label htmlFor="circleDesc">정보</label>
        <textarea id="circleDesc" value={description} onChange={e => setDescription(e.target.value)} required />
        <button type="submit">등록</button>
      </form>

      {modalOpen && (
        <div className="modal" onClick={e => e.target===e.currentTarget&&setModalOpen(false)}>
          <div className={`modal-content ${modalType}`}>{modalMessage}
            <button onClick={()=>setModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import '../styles/ScheduleModal.css';

const ScheduleModal = ({ data, onClose }) => {
    if (!data) return null;
  
    const formatDate = (datetime) =>
      datetime ? datetime.replace('T', ' ').slice(0, 16) : '없음';
  
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{data.title}</h2>
            <div className="modal-content">
                <p><strong>내용:</strong> {data.description || '없음'}</p>
                <p><strong>시작일:</strong> {formatDate(data.startDateTime)}</p>
                <p><strong>종료일:</strong> {formatDate(data.endDateTime)}</p>
                <p><strong>중요도:</strong> {['하', '중', '상'][data.priority]}</p>
                <p><strong>알림 방식:</strong> {data.alarmType || '없음'}</p>
                <p><strong>알림 시간:</strong> {formatDate(data.alarmTime)}</p>
                <p><strong>알림 대상 ID:</strong> {data.alarmTargetId || '없음'}</p>
            </div>
            <div className="modal-footer">
                <button onClick={onClose}>닫기</button>
            </div>
            </div>
        </div>
    );
  };
  
  export default ScheduleModal;
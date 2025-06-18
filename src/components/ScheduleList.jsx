import React from 'react';
import '../styles/ScheduleView.css'; 
const ScheduleList = ({ schedules }) => {
  if (schedules.length === 0)
    return <p style={{ color: 'red', textAlign: 'center' }}>조회된 일정이 없습니다.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>제목</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>중요도</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.scheduleId}>
              <td>{s.title}</td>
              <td>{s.startDateTime}</td>
              <td>{s.endDateTime}</td>
              <td style={{ color: s.priority === 2 ? 'red' : s.priority === 1 ? 'orange' : 'black' }}>
                {['하', '중', '상'][s.priority]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;

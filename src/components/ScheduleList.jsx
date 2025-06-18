import React from 'react';
import '../styles/ScheduleList.css';

const ScheduleList = ({ schedules, onSelect }) => {
  if (schedules.length === 0)
    return <p className="no-schedule">조회된 일정이 없습니다.</p>;

  return (
    <div className="schedule-list-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>중요도</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.scheduleId} onClick={() => onSelect?.(s)}>
              <td>{s.title}</td>
              <td>{s.startDateTime.replace('T', ' ')}</td>
              <td>{s.endDateTime.replace('T', ' ')}</td>
              <td className={`priority-${s.priority}`}>
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

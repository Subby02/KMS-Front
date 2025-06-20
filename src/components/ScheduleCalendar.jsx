// components/ScheduleCalendar.jsx
import React, { useState } from 'react';
import '../styles/ScheduleCalendar.css'; // 스타일 파일 경로를 적절히 수정하세요

export default function ScheduleCalendar({ schedules = [], onSelect }) {
  // ⬇️ today 기준으로 초기화
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());   // 0-based

  /** 이전/다음 달 이동 */
  const shiftMonth = (delta) => {
    const d = new Date(year, month + delta);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  /** 달력 셀 렌더 */
  const renderCells = () => {
    const firstDay   = new Date(year, month, 1).getDay();     // 0 = Sun
    const daysInMon  = new Date(year, month + 1, 0).getDate();
    const cells = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMon) {
          row.push(<td key={j} className="empty" />);
        } else {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const events = schedules.filter(s => {
            const start = new Date(s.startDateTime);
            const end = new Date(s.endDateTime);
            const current = new Date(year, month, day);
          
            // 하루 단위 비교를 위해 시간 제거
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            current.setHours(0, 0, 0, 0);
          
            return start <= current && current <= end;
          });
          
          row.push(
            <td key={j} className="cell">
              <div className="date">{day}</div>

              {events.map(ev => (
                <div
                  key={ev.scheduleId}
                  className="event"
                  onClick={() => onSelect && onSelect(ev)}   // ✅ 일정 클릭
                >
                  {ev.title}
                </div>
              ))}
            </td>
          );
          day++;
        }
      }
      cells.push(<tr key={i}>{row}</tr>);
    }
    return cells;
  };

  return (
    <div className="calendar-wrapper">
      <div className="cal-header">
        <button onClick={() => shiftMonth(-1)}>◀</button>
        <span>{year}-{String(month + 1).padStart(2, '0')}</span>
        <button onClick={() => shiftMonth(1)}>▶</button>
      </div>

      <table className="calendar">
        <thead>
          <tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr>
        </thead>
        <tbody>{renderCells()}</tbody>
      </table>
    </div>
  );
}

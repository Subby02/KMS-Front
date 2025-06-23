// components/ScheduleCalendar.jsx
import React, { useState } from 'react';
import '../styles/ScheduleCalendar.css';

export default function ScheduleCalendar({ schedules = [], onSelect }) {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const shiftMonth = (delta) => {
    const d = new Date(year, month + delta);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const renderCells = () => {
    const firstDay   = new Date(year, month, 1).getDay();
    const daysInMon  = new Date(year, month + 1, 0).getDate();
    const cells = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMon) {
          row.push(<td key={j} className="empty" />);
        } else {
          // ⚠️ ESLint 경고가 발생하는 줄 바로 위
          // eslint-disable-next-line no-loop-func
          const events = schedules.filter(s => {
            const start = new Date(s.startDateTime);
            const end = new Date(s.endDateTime);
            const current = new Date(year, month, day); // 'day' 참조

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
                  onClick={() => onSelect && onSelect(ev)}
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
import React from 'react';
import '../styles/ScheduleView.css'; 
const ScheduleCalendar = ({ schedules, year = 2025, month = 6 }) => {
  const startDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar = [];

  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startDay) || day > daysInMonth) {
        week.push(<td key={j} style={{ backgroundColor: '#f4f4f4' }}></td>);
      } else {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const events = schedules.filter(s => s.startDateTime.startsWith(dateStr));
        week.push(
          <td key={j} style={{ verticalAlign: 'top', padding: '5px' }}>
            <div style={{ fontWeight: 'bold' }}>{day}</div>
            {events.map(ev => (
              <div
                key={ev.scheduleId}
                style={{
                  background: '#007bff22',
                  marginTop: '4px',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#004085'
                }}
              >
                {ev.title}
              </div>
            ))}
          </td>
        );
        day++;
      }
    }
    calendar.push(<tr key={i}>{week}</tr>);
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0e0e0' }}>
            <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
          </tr>
        </thead>
        <tbody>{calendar}</tbody>
      </table>
    </div>
  );
};

export default ScheduleCalendar;

import React from 'react';
import '../styles/ScheduleView.css'; 
const ScheduleFilter = ({ filters, setFilters, onSearch, onReset, onToggleView }) => {
  const handleChange = e => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    gap: '10px 15px',
    alignItems: 'center',
    maxWidth: '500px',
    marginBottom: '20px'
  };

  return (
    <form style={formStyle}>
      <label>시작일</label>
      <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />

      <label>종료일</label>
      <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />

      <label>중요도</label>
      <select name="priority" value={filters.priority} onChange={handleChange}>
        <option value="">전체</option>
        <option value="0">하</option>
        <option value="1">중</option>
        <option value="2">상</option>
      </select>

      <label>제목</label>
      <input type="text" name="title" value={filters.title} onChange={handleChange} />

      <div style={{ gridColumn: '1 / span 2', textAlign: 'center' }}>
        <button type="button" onClick={onSearch} style={{ marginRight: '10px' }}>조회</button>
        <button type="button" onClick={onReset} style={{ marginRight: '10px' }}>초기화</button>
        <button type="button" onClick={onToggleView}>형태 전환</button>
      </div>
    </form>
  );
};

export default ScheduleFilter;

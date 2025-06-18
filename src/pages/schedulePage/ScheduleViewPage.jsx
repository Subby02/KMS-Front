import React, { useEffect, useState } from 'react';
import ScheduleFilter from '../../components/ScheduleFilter';
import ScheduleList from '../../components/ScheduleList';
import ScheduleCalendar from '../../components/ScheduleCalendar';
import '../../styles/ScheduleView.css';

const ScheduleViewPage = () => {
  const [allSchedules, setAllSchedules] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isCalendar, setIsCalendar] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', title: '', priority: '' });

  const fetchSchedules = async () => {
    const res = await fetch('/schedule/monthly?year=2025&month=6');
    const data = await res.json();
    setAllSchedules(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSearch = () => {
    const f = filters;
    const filtered = allSchedules.filter(s => {
      const date = s.startDateTime.substring(0, 10);
      if (f.startDate && date < f.startDate) return false;
      if (f.endDate && date > f.endDate) return false;
      if (f.priority && s.priority.toString() !== f.priority) return false;
      if (f.title && !s.title.toLowerCase().includes(f.title.toLowerCase())) return false;
      return true;
    });
    setFiltered(filtered);
  };

  const handleReset = () => {
    setFilters({ startDate: '', endDate: '', title: '', priority: '' });
    setFiltered(allSchedules);
  };

  const handleToggleView = () => {
    setIsCalendar(prev => !prev);
  };

  return (
    <div className="schedule-view-container">
      <h2>📖 일정 조회</h2>
      <ScheduleFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
        onToggleView={handleToggleView}
      />
      {isCalendar ? (
        <ScheduleCalendar schedules={filtered} year={2025} month={6} />
      ) : (
        <ScheduleList schedules={filtered} />
      )}
    </div>
  );
  
};

export default ScheduleViewPage;

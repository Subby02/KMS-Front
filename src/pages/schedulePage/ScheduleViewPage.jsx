import React, { useEffect, useState, useMemo } from 'react';
import ScheduleFilter from '../../components/ScheduleFilter';
import ScheduleList from '../../components/ScheduleList';
import ScheduleCalendar from '../../components/ScheduleCalendar';
import ScheduleModal from '../../components/ScheduleModal';
import '../../styles/ScheduleView.css';

const ScheduleViewPage = () => {
  const [allSchedules, setAllSchedules] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    title: '',
    priority: '',
  });
  const [isCalendar, setIsCalendar] = useState(false);
  const [selected, setSelected] = useState(null);

  // ✅ 전체 일정 불러오기
  const fetchSchedules = async () => {
    try {
      const res = await fetch('/schedule/all');
      const data = await res.json();

      if (Array.isArray(data)) {
        setAllSchedules(data);
      } else {
        console.error('예상 외 응답:', data);
        setAllSchedules([]);
      }
    } catch (err) {
      console.error('일정 로드 실패', err);
      setAllSchedules([]);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ✅ 필터링은 메모이제이션으로 자동 연산
  const filtered = useMemo(() => {
    const f = filters;
    return allSchedules.filter((s) => {
      if (!s.startDateTime) return false;
      const date = s.startDateTime.substring(0, 10);
      if (f.startDate && date < f.startDate) return false;
      if (f.endDate && date > f.endDate) return false;
      if (f.priority && s.priority.toString() !== f.priority) return false;
      if (f.title && !s.title.toLowerCase().includes(f.title.toLowerCase())) return false;
      return true;
    });
  }, [allSchedules, filters]);

  const handleSearch = () => {
    // useMemo가 자동으로 필터링하므로 별도 setFiltered는 필요 없음
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      title: '',
      priority: '',
    });
  };

  const handleToggleView = () => {
    setIsCalendar((prev) => !prev);
  };

  const handleScheduleSelect = (schedule) => {
    setSelected(schedule);
  };

  return (
    <>
      <div className="schedule-view-container">
        <h2>일정 조회</h2>

        <ScheduleFilter
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
          onToggleView={handleToggleView}
        />

        {isCalendar ? (
          <ScheduleCalendar schedules={filtered} onSelect={handleScheduleSelect} />
        ) : (
          <ScheduleList schedules={filtered} onSelect={handleScheduleSelect} />
        )}
      </div>

      {selected && (
        <ScheduleModal data={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default ScheduleViewPage;

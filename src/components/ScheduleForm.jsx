import React, { useState } from 'react';
import '../styles/ScheduleForm.css';

const ScheduleForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    priority: '0',
    alarmType: 'None',
    alarmTimeBefore: '',
    alarmTime: '',
    alarmScope: '',
    alarmTargetId: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 알림 시간 자동 계산
    if (name === 'alarmTimeBefore') {
      const end = new Date(form.endDateTime);
      if (!isNaN(end) && value) {
        end.setMinutes(end.getMinutes() - parseInt(value));
        const iso = end.toISOString().slice(0, 16);
        setForm((prev) => ({ ...prev, alarmTime: iso }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { title, startDateTime, endDateTime } = form;
    if (!title || !startDateTime || !endDateTime) {
      setError('제목, 시작일시, 종료일시는 필수입니다.');
      return;
    }
    if (new Date(startDateTime) > new Date(endDateTime)) {
      setError('종료일시는 시작일시 이후여야 합니다.');
      return;
    }

    try {
      const res = await fetch('/schedule/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('등록 실패');
      alert('일정이 등록되었습니다.');
      setForm({
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        priority: '0',
        alarmType: 'None',
        alarmTimeBefore: '',
        alarmTime: '',
        alarmScope: '',
        alarmTargetId: '',
      });
      if (onAdd) onAdd();
    } catch (err) {
      setError('서버 오류로 등록 실패');
    }
  };

  return (
    <div className="schedule-form-wrapper">
      <form className="schedule-form" onSubmit={handleSubmit}>
        <h2>일정 등록</h2>

        <label>제목 *</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />

        <label>내용</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label>시작 일시 *</label>
        <input type="datetime-local" name="startDateTime" value={form.startDateTime} onChange={handleChange} required />

        <label>종료 일시 *</label>
        <input type="datetime-local" name="endDateTime" value={form.endDateTime} onChange={handleChange} required />

        <label>중요도</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="0">하</option>
          <option value="1">중</option>
          <option value="2">상</option>
        </select>

        {form.priority === '2' && (
          <>
            <h3>🔔 알림 설정</h3>

            <label>알림 방식</label>
            <select name="alarmType" value={form.alarmType} onChange={handleChange}>
              <option value="None">없음</option>
              <option value="Popup">팝업</option>
              <option value="Email">이메일</option>
              <option value="SMS">문자</option>
            </select>

            <label>알림 범위</label>
            <select name="alarmScope" value={form.alarmScope} onChange={handleChange}>
              <option value="">선택</option>
              <option value="all">전체 직원</option>
              <option value="department">특정 부서</option>
              <option value="myDepartment">소속 부서원</option>
            </select>

            <label>알림 시기</label>
            <select name="alarmTimeBefore" value={form.alarmTimeBefore} onChange={handleChange}>
              <option value="">선택</option>
              <option value="10080">1주일 전</option>
              <option value="1440">1일 전</option>
              <option value="60">1시간 전</option>
              <option value="10">10분 전</option>
            </select>

            <label>알림 시간</label>
            <input type="datetime-local" name="alarmTime" value={form.alarmTime} readOnly />

            <label>알림 대상 ID</label>
            <input type="text" name="alarmTargetId" value={form.alarmTargetId} onChange={handleChange} maxLength={20} />
          </>
        )}

        {error && <div className="error-message">{error}</div>}

        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default ScheduleForm;

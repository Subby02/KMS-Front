import React, { useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alarmSet, setAlarmSet] = useState("true");
  const [visibleSet, setVisibleSet] = useState("true");
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!title.trim() || !startDate.trim()) {
      setModalType("error");
      setModalMessage("제목과 시작일은 필수 입력입니다.");
      return;
    }

    const requestBody = {
      title: title.trim(),
      startDate, // "yyyy-MM-dd" 문자열
      endDate: endDate ? endDate : null, // 빈 문자열이면 null로 보내도 무방
      alarmSet: alarmSet === "true",
      visibleSet: visibleSet === "true",
      // userId는 보내지 않음. 백엔드에서 자동 "T001"로 설정함.
    };

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setModalType("success");
        setModalMessage("업무가 성공적으로 등록되었습니다.");
        // 폼 초기화
        setTitle("");
        setStartDate("");
        setEndDate("");
        setAlarmSet("true");
        setVisibleSet("true");
      } else {
        // 서버가 보낸 에러 메시지 받아오기
        const errorText = await response.text();
        setModalType("error");
        setModalMessage(`등록 실패: ${errorText}`);
      }
    } catch (err) {
      console.error("API 호출 오류:", err);
      setModalType("error");
      setModalMessage("업무 등록 중 오류가 발생했습니다.");
    }
  };

  const closeModal = () => {
    setModalType(null);
    setModalMessage("");
  };

  return (
    <div className="form-container">
      <h2>업무 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>시작일</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>종료일</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label>알림 설정</label>
        <select value={alarmSet} onChange={(e) => setAlarmSet(e.target.value)}>
          <option value="true">설정함</option>
          <option value="false">설정 안 함</option>
        </select>

        <label>공개 설정</label>
        <select
          value={visibleSet}
          onChange={(e) => setVisibleSet(e.target.value)}
        >
          <option value="true">공개</option>
          <option value="false">비공개</option>
        </select>

        <button type="submit">등록</button>
      </form>

      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;

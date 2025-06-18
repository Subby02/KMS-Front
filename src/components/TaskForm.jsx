import React, { useState } from "react";
import "../styles/TaskForm.css";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    startDate: "",
    endDate: "",
    alarm: "true",
    public: "true",
  });
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setModalOpen(true);
    setFormData({
      userId: "",
      title: "",
      startDate: "",
      endDate: "",
      alarm: "true",
      public: "true",
    });
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="container">
      <h1>업무 등록</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="userId">유저 아이디</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="startDate">시작일</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">종료일</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <label htmlFor="alarm">알림 설정</label>
        <select
          id="alarm"
          name="alarm"
          value={formData.alarm}
          onChange={handleChange}
        >
          <option value="true">설정함</option>
          <option value="false">설정안함</option>
        </select>

        <label htmlFor="public">공개 설정</label>
        <select
          id="public"
          name="public"
          value={formData.public}
          onChange={handleChange}
        >
          <option value="true">공개</option>
          <option value="false">비공개</option>
        </select>

        <button type="submit">업무 등록</button>
      </form>

      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <p>✅ 업무가 등록되었습니다!</p>
            <button className="closeBtn" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

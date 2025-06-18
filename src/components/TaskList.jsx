import React, { useState } from "react";
import "../styles/TaskList.css"; // 일반 CSS라서 스타일 객체 X

const sampleDataInit = [
  {
    id: 1,
    유저아이디: "user01",
    제목: "보고서 작성",
    시작일: "2025-06-01",
    종료일: "2025-06-02",
  },
  {
    id: 2,
    유저아이디: "user02",
    제목: "팀 회의",
    시작일: "2025-06-03",
    종료일: "2025-06-03",
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState(sampleDataInit);
  const [modalOpen, setModalOpen] = useState(false);

  function showTasks() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function deleteTask(id) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  }

  function editTask(id) {
    const task = tasks.find((t) => t.id === id);
    alert(`수정할 항목:\n\n제목: ${task.제목}\n시작일: ${task.시작일}`);
  }

  return (
    <div className="container">
      <h1>업무 조회</h1>
      <button onClick={showTasks} className="openBtn">
        업무 조회
      </button>

      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div id="taskList">
              {tasks.length === 0 ? (
                <p>📭 조회 결과가 없습니다.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="taskCard">
                    <p>
                      <strong>📌 업무 번호:</strong> {task.id}
                    </p>
                    <p>
                      <strong>👤 유저 아이디:</strong> {task.유저아이디}
                    </p>
                    <p>
                      <strong>📄 제목:</strong> {task.제목}
                    </p>
                    <p>
                      <strong>🕒 시작일:</strong> {task.시작일}
                    </p>
                    <p>
                      <strong>🕓 종료일:</strong> {task.종료일}
                    </p>
                    <div className="taskButtons">
                      <button
                        className="editBtn"
                        onClick={() => editTask(task.id)}
                      >
                        수정
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => deleteTask(task.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="closeBtn" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

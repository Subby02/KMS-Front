import React, { useState, useEffect } from "react";
import "../styles/TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/tasks/T001");
      if (!res.ok) throw new Error("서버 오류");
      const data = await res.json();

      const converted = data.map((task, idx) => ({
        id: idx + 1,
        userId: task.userId,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
      }));

      setTasks(converted);
    } catch (error) {
      alert("업무 불러오기 실패");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>업무 목록</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="제목 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchTasks}>🔄 새로고침</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>업무 번호</th>
            <th>유저 아이디</th>
            <th>제목</th>
            <th>시작일</th>
            <th>종료일</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                📭 조회 결과가 없습니다.
              </td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.userId}</td>
                <td>{task.title}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

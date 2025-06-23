import React, { useState } from "react";
import "../styles/ClubList.css";

export default function ClubList() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/stdClub/search");

      if (response.status === 403) {
        setModalType("error");
        setModalMessage("접근 권한이 없습니다.");
        setClubs([]);
        setModalOpen(true);
        return;
      }

      if (!response.ok) throw new Error("네트워크 에러");

      const data = await response.json();
      setClubs(data);
      setModalType(""); // 정상 조회면 타입 초기화
    } catch (error) {
      console.error("에러 발생:", error);
      setClubs([]);
      setModalType("error");
      setModalMessage("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType("");
    setModalMessage("");
  };

  return (
    <div className="club-container">
      <h1>학습동아리 조회</h1>
      <button onClick={fetchClubs} className="openBtn">
        조회
      </button>

      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          {modalType === "error" ? (
            <div
              className="modal-content error"
              onClick={(e) => e.stopPropagation()}
            >
              <p>{modalMessage}</p>
              <button onClick={closeModal}>닫기</button>
            </div>
          ) : (
            <div
              className="modalContent"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>조회 결과</h2>
              {loading ? (
                <p>로딩 중...</p>
              ) : clubs.length === 0 ? (
                <p>📭 아직 등록된 동아리가 없습니다.</p>
              ) : (
                <table className="club-table">
                  <thead>
                    <tr>
                      <th>동아리명</th>
                      <th>관리자명</th>
                      <th>설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubs.map((club, index) => (
                      <tr key={index}>
                        <td>{club.stdClubName}</td>
                        <td>{club.stdClubManagerName}</td>
                        <td>{club.stdClubInfo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
                <button onClick={closeModal}>닫기</button>

            </div>
          )}
        </div>
      )}
    </div>
  );
}

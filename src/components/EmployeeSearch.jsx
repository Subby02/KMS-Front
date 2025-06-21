
import React, { useState } from "react";

const EmployeeSearch = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

 const handleSearch = async () => {
    try {
      // ID 기준 검색
      const idResponse = await fetch(`http://localhost:8080/employees/${query}`);
      if (idResponse.ok) {
        const data = await idResponse.json();
        setResult(data);
        setShowModal(false);
        return;
      }

      // 이름 기준 검색
      const nameResponse = await fetch(`http://localhost:8080/employees/search?name=${query}`);
      if (nameResponse.ok) {
        const dataList = await nameResponse.json();
        if (dataList.length > 0) {
          setResult(dataList[0]);
          setShowModal(false);
        } else {
          setResult(null);
          setShowModal(true);
        }
      } else {
        setResult(null);
        setShowModal(true);
      }
    } catch (error) {
      alert("서버 통신 오류 발생");
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <label htmlFor="query">아이디 / 이름</label>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="button" onClick={handleSearch}>조회</button>
      </form>

      {result && (
        <div style={styles.outputBox}>
          <p><strong>아이디:</strong> {result.empId}</p>
          <p><strong>이름:</strong> {result.name}</p>
          <p><strong>부서:</strong> {result.dept}</p>
          <p><strong>전화번호:</strong> {result.phone}</p>
          <p><strong>이메일:</strong> {result.email}</p>
          <p><strong>상태:</strong> {result.status}</p>
          <p><strong>등록일:</strong> {result.regDate}</p>
        </div>
      )}

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <p>조회 결과가 없습니다.</p>
            <button onClick={() => setShowModal(false)} style={styles.closeBtn}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  form: {
    textAlign: "left",
    marginBottom: "20px"
  },
  outputBox: {
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "left",
  },
  modal: {
    display: "block",
    position: "fixed",
    zIndex: 999,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: "15% auto",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "350px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    border: "3px solidrgb(0, 0, 0)",
    color: "#000000"
  },
  closeBtn: {
    marginTop: "20px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default EmployeeSearch;

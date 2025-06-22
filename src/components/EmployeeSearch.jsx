import React, { useState } from "react";
import "../styles/EmployeeSearch.css";

const EmployeeSearch = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("id"); // "id" 또는 "name"
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

 const handleSearch = async () => {
    setResult(null);
    setShowModal(false);

    let foundResult = null;

    try {
      if (searchType === "id") {
        // ID로 검색
        const idRes = await fetch(`http://localhost:8080/employees/${query}`);
        if (idRes.ok) {
          const data = await idRes.json();
          foundResult = data;
        }
      } else {
        // 이름으로 검색
        const nameRes = await fetch(`http://localhost:8080/employees/search?name=${query}`);
        if (nameRes.ok) {
          const dataList = await nameRes.json();
          if (dataList.length > 0) {
            foundResult = dataList[0]; 
          }
        }
      }
    } catch (error) {
      console.log(`${searchType === "id" ? "ID" : "이름"} 검색 실패`, error);
    }

    if (foundResult) {
      setResult(foundResult);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="employee-search-container">
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <label htmlFor="query">직원 정보 조회</label>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />

        <div className="search-radio-group" style={{ marginTop: "10px", marginBottom: "10px" }}>
          <label>
            <input
              type="radio"
              value="id"
              checked={searchType === "id"}
              onChange={() => setSearchType("id")}
            />

            아이디로 검색
          </label>
          <label>
            <input
              type="radio"
              value="name"
              checked={searchType === "name"}
              onChange={() => setSearchType("name")}
            />
            이름으로 검색
          </label>
        </div>

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
    </div>
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

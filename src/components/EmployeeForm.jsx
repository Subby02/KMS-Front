import React, { useState } from "react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    empId: "",
    pw: "",
    name: "",
    dept: "",
    phone: "",
    email: "",
    status: "재직",
    regDate: "자동 생성",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 입력값 검사
    const { empId, pw, name, dept, phone, email } = formData;
    if (!empId || !pw || !name || !dept || !phone || !email) {
      setErrorMessage("필수 입력 정보를 모두 입력하세요.");
      setShowErrorModal(true);
      return;
    }

    // 중복 아이디 검사 (테스트용: emp01이 이미 존재한다고 가정)
    if (empId === "emp01") {
      setErrorMessage("이미 존재하는 아이디입니다.");
      setShowErrorModal(true);
      return;
    }

    // 모든 검사를 통과한 경우
    setShowSuccessModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="empId">아이디</label>
        <input type="text" id="empId" name="empId" value={formData.empId} onChange={handleChange} />

        <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw" name="pw" value={formData.pw} onChange={handleChange} />

        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="dept">부서</label>
        <input type="text" id="dept" name="dept" value={formData.dept} onChange={handleChange} />

        <label htmlFor="phone">전화번호</label>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="status">상태</label>
        <input type="text" id="status" name="status" value={formData.status} readOnly />

        <label htmlFor="regDate">등록일</label>
        <input type="text" id="regDate" name="regDate" value={formData.regDate} readOnly />

        <button type="submit">가입</button>
      </form>

      {/* 오류 모달 */}
      {showErrorModal && (
        <div style={styles.modal}>
          <div style={{ ...styles.modalContent, ...styles.error }}>
            <p>{errorMessage}</p>
            <button onClick={() => setShowErrorModal(false)} style={styles.closeBtn}>닫기</button>
          </div>
        </div>
      )}

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div style={styles.modal}>
          <div style={{ ...styles.modalContent, ...styles.success }}>
            <p>가입이 완료되었습니다.</p>
            <button onClick={() => setShowSuccessModal(false)} style={styles.closeBtn}>확인</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  form: {
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
  },
  success: {
    border: "3px solidrgb(0, 0, 0)",
    color: "00000",
  },
  error: {
    color: "00000", 
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

export default EmployeeForm;

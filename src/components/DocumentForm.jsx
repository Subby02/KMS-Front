// src/components/DocumentForm.jsx
import React, { useState, useRef } from "react";
import "../styles/DocumentForm.css"; // CSS도 동일한 폴더 구조에 두고

const DocumentForm = ({ onRegister }) => {
  // 1) 초기 form state
  const getInitial = () => ({
    docTitle: "",
    content: "",
  });
  const [formData, setFormData] = useState(getInitial());
  const [file, setFile] = useState(null);

  // 2) 모달 / 로딩 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 3) 파일 input ref (초기화 용)
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalOpen(false);

    // 필수 검증
    if (!formData.docTitle.trim() || !formData.content.trim() || !file) {
      setModalMessage("제목·내용·파일은 모두 필수입니다.");
      setIsSuccess(false);
      setModalOpen(true);
      setIsLoading(false);
      return;
    }

    // FormData 구성
    const fd = new FormData();
    fd.append(
      "documentInfo",
      new Blob(
        [
          JSON.stringify({
            docTitle: formData.docTitle,
            content: formData.content,
          }),
        ],
        { type: "application/json" }
      )
    );
    fd.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/document/register", {
        method: "POST",
        body: fd,
      });
      const body = await res.json();

      if (!res.ok) throw new Error(body.message || "등록에 실패했습니다.");

      setModalMessage(body.message || "문서가 등록되었습니다.");
      setIsSuccess(true);
      onRegister && onRegister({ ...formData, file });
      setFormData(getInitial());
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setModalMessage(err.message);
      setIsSuccess(false);
    } finally {
      setModalOpen(true);
      setIsLoading(false);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="form-container">
      <h2>문서 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid-container">
          {/* 왼쪽 컬럼 */}
          <div className="form-column">
            <label>문서 제목</label>
            <input
              name="docTitle"
              value={formData.docTitle}
              onChange={handleChange}
            />

            <label>문서 내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="form-column">
            <label>첨부 파일</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {file && <p className="file-info">선택된 파일: {file.name}</p>}
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "등록 중..." : "등록"}
        </button>
      </form>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className={isSuccess ? "success-message" : "error-message"}>
              {modalMessage}
            </p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentForm;

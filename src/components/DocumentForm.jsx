// src/components/DocumentForm.jsx
import React, { useState, useRef } from "react";
import "../styles/DocumentForm.css";

const DocumentForm = ({ onRegister }) => {
  const getInitial = () => ({
    docTitle: "",
    content: "",
  });

  const [formData, setFormData] = useState(getInitial());
  const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalOpen(false);

    if (!formData.docTitle.trim() || !formData.content.trim() || !file) {
      setModalMessage("제목·내용·파일은 모두 필수입니다.");
      setIsSuccess(false);
      setModalOpen(true);
      setIsLoading(false);
      return;
    }

    const fd = new FormData();
    const jsonBlob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });
    fd.append("documentInfo", jsonBlob);
    fd.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/document/register", {
        method: "POST",
        body: fd,
      });

      const raw = await res.text();
      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        body = { message: raw };
      }

      if (!res.ok) {
        throw new Error(body.message || "문서 등록 실패");
      }

      setModalMessage(body.message || "문서가 등록되었습니다.");
      setIsSuccess(true);

      onRegister && onRegister({ ...formData, file });
      setFormData(getInitial());
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setModalMessage(err.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="form-container">
      <h2>문서 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid-container">
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

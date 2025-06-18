import React, { useState } from 'react';
// CSS 파일 경로는 프로젝트 구조에 맞게 확인해주세요.
import '../styles/EducationForm.css';

const EducationForm = () => {
  const getInitialState = () => ({
    eduType: '오프라인',
    eduName: '',
    eduDescription: '',
    eduLocation: '',
    maxApplicant: '',
    applyStartDate: '',
    applyEndDate: '',
    eduStartDate: '',
    eduEndDate: '',
    educatorName: '',
    educatorContact: '',
    attachmentPath: '',
    referenceType: '동영상 파일',
    videoPath: '',
    videoUrl: '',
    thumbnailPath: ''
  });

  const [formData, setFormData] = useState(getInitialState());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'referenceType') {
      setFormData({
        ...formData,
        [name]: value,
        videoPath: '',
        videoUrl: ''
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const submissionData = {
      ...formData,
      maxApplicant: parseInt(formData.maxApplicant, 10) || 0,
    };

    fetch('http://localhost:8080/education/enrol', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || '등록 과정에서 오류가 발생했습니다.');
        }
        return data;
      })
      .then((data) => {
        setModalMessage(data.message);
        setIsSuccess(true);
        setModalOpen(true);
        setFormData(getInitialState());
      })
      .catch((error) => {
        setModalMessage(error.message);
        setIsSuccess(false);
        setModalOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeModal = () => setModalOpen(false);


  return (
    <div className="form-container">
      <h2>교육 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid-container">
          {/* 왼쪽 컬럼 */}
          <div className="form-column">
            <label>교육 유형</label>
            <select name="eduType" value={formData.eduType} onChange={handleChange}>
              <option value="오프라인">오프라인</option>
              <option value="온라인">온라인</option>
            </select>

            <label>교육 이름</label>
            <input name="eduName" value={formData.eduName} onChange={handleChange} />

            <label>교육 설명</label>
            <textarea name="eduDescription" value={formData.eduDescription} onChange={handleChange} />

            <label>교육 장소</label>
            <input name="eduLocation" value={formData.eduLocation} onChange={handleChange} />

            <label>교육 최대 인원</label>
            <input name="maxApplicant" type="number" min="1" value={formData.maxApplicant} onChange={handleChange} />
            
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="form-column">
            {/* ==================== 수정된 부분 1: 신청 기간 ==================== */}
            <div className="form-group date-range">
              <label>신청 기간</label>
              <div>
                <input name="applyStartDate" type="date" value={formData.applyStartDate} onChange={handleChange} />
                <span>~</span>
                <input name="applyEndDate" type="date" value={formData.applyEndDate} onChange={handleChange} />
              </div>
            </div>

            {/* ==================== 수정된 부분 2: 교육 기간 ==================== */}
            <div className="form-group date-range">
              <label>교육 기간</label>
              <div>
                <input name="eduStartDate" type="date" value={formData.eduStartDate} onChange={handleChange} />
                <span>~</span>
                <input name="eduEndDate" type="date" value={formData.eduEndDate} onChange={handleChange} />
              </div>
            </div>

            <label>교육 담당자 이름</label>
            <input name="educatorName" value={formData.educatorName} onChange={handleChange} />

            <label>교육 담당자 연락처 (형식: 010-1234-5678)</label>
            <input name="educatorContact" value={formData.educatorContact} onChange={handleChange} placeholder="010-1234-5678" />
            
            <label>자료 등록 유형</label>
            <select name="referenceType" value={formData.referenceType} onChange={handleChange}>
              <option value="동영상 파일">동영상 파일</option>
              <option value="URL">URL</option>
            </select>

            {formData.referenceType === '동영상 파일' && (
              <>
                <label>동영상 파일 경로</label>
                <input name="videoPath" value={formData.videoPath} onChange={handleChange} />
              </>
            )}
            {formData.referenceType === 'URL' && (
              <>
                <label>동영상 URL</label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
              </>
            )}
            
            <label>썸네일 파일 경로</label>
            <input name="thumbnailPath" value={formData.thumbnailPath} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? '등록 중...' : '등록'}
        </button>
      </form>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className={isSuccess ? 'success-message' : 'error-message'}>
              {modalMessage}
            </p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
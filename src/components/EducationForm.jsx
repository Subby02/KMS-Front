import React, { useState, useRef } from 'react';
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
  });

  const [formData, setFormData] = useState(getInitialState());
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const videoFileInputRef = useRef(null);
  const thumbnailFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'referenceType') {
      setFormData({
        ...formData,
        [name]: value,
      });
      // 자료 등록 유형이 변경되면 관련된 파일 입력 필드 초기화
      setVideoFile(null);
      if (videoFileInputRef.current) {
        videoFileInputRef.current.value = '';
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalOpen(false);

    const submissionData = {
      ...formData,
      maxApplicant: parseInt(formData.maxApplicant, 10) || 0,
    };

    const requestFormData = new FormData();

    requestFormData.append(
      'educationInfo',
      new Blob([JSON.stringify(submissionData)], { type: 'application/json' })
    );

    // --- 변경된 부분 시작 ---
    // referenceType이 '동영상 파일'일 때만 videoFile을 처리
    if (formData.referenceType === '동영상 파일') {
      if (videoFile) {
        requestFormData.append('videoFile', videoFile);
      } else {
        // 동영상 파일이 필수인 경우 (참고: 현재 요구사항은 "필수가 아니다"이므로 이 블록은 주석 처리 또는 제거)
        // 만약 '동영상 파일' 유형 선택 시 파일 첨부가 필수라면 이 유효성 검사를 유지합니다.
        // setModalMessage('동영상 파일을 첨부해야 합니다.');
        // setIsSuccess(false);
        // setModalOpen(true);
        // setIsLoading(false);
        // return;
      }
    } else if (formData.referenceType === 'URL') {
      // URL 유형일 때는 videoFile을 첨부하지 않습니다.
      // DTO의 videoUrl 필드에 formData.videoUrl이 잘 들어가도록 서버에서 처리해야 합니다.
      // (현재 프론트엔드에서는 URL을 EducationDTO에 포함시켜 보내고 있습니다.)
    }
    // --- 변경된 부분 끝 ---


    // 썸네일 파일은 이전과 동일하게 처리 (필수가 아님)
    if (thumbnailFile) {
      requestFormData.append('thumbnailFile', thumbnailFile);
    }

    try {
      const res = await fetch('http://localhost:8080/education/enrol', {
        method: 'POST',
        body: requestFormData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || '등록 과정에서 오류가 발생했습니다.');
      }

      setModalMessage(data.message);
      setIsSuccess(true);
      setModalOpen(true);
      setFormData(getInitialState());
      setVideoFile(null);
      setThumbnailFile(null);
      if (videoFileInputRef.current) {
        videoFileInputRef.current.value = '';
      }
      if (thumbnailFileInputRef.current) {
        thumbnailFileInputRef.current.value = '';
      }

    } catch (error) {
      setModalMessage(error.message);
      setIsSuccess(false);
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
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
            <input name="eduName" value={formData.eduName} onChange={handleChange} required />

            <label>교육 설명</label>
            <textarea name="eduDescription" value={formData.eduDescription} onChange={handleChange} required />

            <label>교육 장소</label>
            <input name="eduLocation" value={formData.eduLocation} onChange={handleChange} required />

            <label>교육 최대 인원</label>
            <input name="maxApplicant" type="number" min="1" value={formData.maxApplicant} onChange={handleChange} required />

          </div>

          {/* 오른쪽 컬럼 */}
          <div className="form-column">
            <div className="form-group date-range">
              <label>신청 기간</label>
              <div>
                <input name="applyStartDate" type="date" value={formData.applyStartDate} onChange={handleChange} required />
                <span>~</span>
                <input name="applyEndDate" type="date" value={formData.applyEndDate} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group date-range">
              <label>교육 기간</label>
              <div>
                <input name="eduStartDate" type="date" value={formData.eduStartDate} onChange={handleChange} required />
                <span>~</span>
                <input name="eduEndDate" type="date" value={formData.eduEndDate} onChange={handleChange} required />
              </div>
            </div>

            <label>교육 담당자 이름</label>
            <input name="educatorName" value={formData.educatorName} onChange={handleChange} required />

            <label>교육 담당자 연락처 (형식: 010-1234-5678)</label>
            <input name="educatorContact" value={formData.educatorContact} onChange={handleChange} placeholder="010-1234-5678" required />

            <label>자료 등록 유형</label>
            <select name="referenceType" value={formData.referenceType} onChange={handleChange}>
              <option value="동영상 파일">동영상 파일</option>
              <option value="URL">URL</option>
            </select>

            {formData.referenceType === '동영상 파일' && (
              <>
                <label htmlFor="videoFile">동영상 파일 (선택 사항)</label>
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  ref={videoFileInputRef}
                  // required 속성을 제거합니다.
                />
                {videoFile && <p className="file-info">선택된 파일: {videoFile.name}</p>}
              </>
            )}
            {formData.referenceType === 'URL' && (
              <>
                <label>동영상 URL</label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} required />
              </>
            )}

            <label htmlFor="thumbnailFile">썸네일 파일 (선택 사항)</label>
            <input
              type="file"
              id="thumbnailFile"
              name="thumbnailFile"
              accept="image/*"
              onChange={handleThumbnailFileChange}
              ref={thumbnailFileInputRef}
            />
            {thumbnailFile && <p className="file-info">선택된 파일: {thumbnailFile.name}</p>}

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
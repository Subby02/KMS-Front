import React, { useState } from 'react';
import '../styles/EducationSearch.css'; // CSS 파일 경로 확인

const EducationSearch = () => {
  const initialSearchState = {
    eduType: '',
    eduName: '',
    eduLocation: '',
    applyStartDate: '',
    applyEndDate: '',
    eduStartDate: '',
    eduEndDate: '',
    educatorName: '',
  };

  const [searchParams, setSearchParams] = useState(initialSearchState);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. hasSearched 상태를 완전히 제거합니다.
  // const [hasSearched, setHasSearched] = useState(false); // 이 줄 삭제

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleReset = () => {
    setSearchParams(initialSearchState);
    setResults([]);
    // 2. setHasSearched 호출을 삭제합니다.
    // setHasSearched(false); // 이 줄 삭제
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // 3. setHasSearched 호출을 삭제합니다.
    // setHasSearched(true); // 이 줄 삭제
    setResults([]);
    setModalMessage('');

    const query = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== null && value !== '')
    );

    fetch('http://localhost:8080/education/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || '검색 중 오류가 발생했습니다.');
        }
        return data;
      })
      .then(data => {
        setResults(data);
        if (data.length === 0) {
            setModalMessage('검색 조건에 맞는 결과가 없습니다.');
            setModalOpen(true);
        }
      })
      .catch(err => {
        setModalMessage(err.message);
        setModalOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeModal = () => setModalOpen(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="search-container">
      <h2>교육 검색</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-grid">
          {/* 폼 그리드 내용은 그대로 유지 */}
          <div className="form-group">
            <label>교육 유형</label>
            <select name="eduType" value={searchParams.eduType} onChange={handleChange}>
              <option value="">전체</option>
              <option value="오프라인">오프라인</option>
              <option value="온라인">온라인</option>
            </select>
          </div>
          <div className="form-group">
            <label>교육 이름</label>
            <input name="eduName" value={searchParams.eduName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>교육 장소</label>
            <input name="eduLocation" value={searchParams.eduLocation} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>교육 담당자</label>
            <input name="educatorName" value={searchParams.educatorName} onChange={handleChange} />
          </div>
          <div className="form-group date-range">
            <label>신청 기간</label>
            <div>
              <input name="applyStartDate" type="date" value={searchParams.applyStartDate} onChange={handleChange} />
              <span>~</span>
              <input name="applyEndDate" type="date" value={searchParams.applyEndDate} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group date-range">
            <label>교육 기간</label>
            <div>
              <input name="eduStartDate" type="date" value={searchParams.eduStartDate} onChange={handleChange} />
              <span>~</span>
              <input name="eduEndDate" type="date" value={searchParams.eduEndDate} onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <div className="form-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? '검색 중...' : '검색'}
          </button>
          <button type="button" onClick={handleReset}>초기화</button>
        </div>
      </form>

      <div className="results-container">
        <h3>검색 결과</h3>
        {isLoading && <p>결과를 불러오는 중입니다...</p>}
        {!isLoading && results.length > 0 && (
          <table className="results-table">
            <thead>
              <tr>
                <th>썸네일</th> {/* 썸네일 컬럼 추가 */}
                <th>교육 이름</th>
                <th>유형</th>
                <th>장소</th>
                <th>신청 기간</th>
                <th>교육 기간</th>
                <th>담당자</th>
              </tr>
            </thead>
            <tbody>
              {results.map(edu => (
                <tr key={edu.eduId}>
                  <td>
                    {edu.thumbnailPath ? (
                      <img
                        src={edu.thumbnailPath}
                        alt={`${edu.eduName} 썸네일`}
                        className="thumbnail-preview" // CSS 클래스 추가
                      />
                    ) : (
                      <span>N/A</span> // 썸네일이 없을 경우 표시
                    )}
                  </td>
                  <td>{edu.eduName}</td>
                  <td>{edu.eduType}</td>
                  <td>{edu.eduLocation}</td>
                  <td>{formatDate(edu.applyStartDate)} ~ {formatDate(edu.applyEndDate)}</td>
                  <td>{formatDate(edu.eduStartDate)} ~ {formatDate(edu.eduEndDate)}</td>
                  <td>{edu.educatorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && results.length === 0 && <p>검색 조건에 맞는 결과가 없습니다.</p>} {/* 결과 없을 때 메시지 표시 */}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="error-message">{modalMessage}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSearch;
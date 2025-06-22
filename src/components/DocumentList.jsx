// src/pages/DocumentListPage.jsx
import React, { useState } from 'react';
import '../styles/DocumentList.css';

export default function DocumentListPage() {
  const [docs, setDocs]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchAllDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/document');
      if (!res.ok) throw new Error('서버에서 문서 목록을 가져오지 못했습니다.');
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-container">
      <h2>문서 조회</h2>
      <button onClick={fetchAllDocuments} disabled={loading}>
        {loading ? '조회 중...' : '조회'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {docs.length > 0 && (
        <table className="doc-table">
          <thead>
            <tr>
              <th>문서ID</th>
              <th>제목</th>
              <th>등록일</th>
              <th>첨부파일</th>
            </tr>
          </thead>
          <tbody>
            {docs.map(doc => (
              <tr key={doc.docId}>
                <td>{doc.docId}</td>
                <td>{doc.docTitle}</td>
                <td>{new Date(doc.createdAt).toLocaleString()}</td>
                <td>
                  {doc.fileUploadPath
                    ? <a href={`http://localhost:8080/uploads/${doc.fileUploadPath}`} download>
                        다운로드
                      </a>
                    : '—'
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {docs.length === 0 && !loading && !error && (
        <p className="empty-message">조회된 문서가 없습니다.</p>
      )}
    </div>
  );
}

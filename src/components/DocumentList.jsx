import React, { useState, useEffect } from "react";
import "../styles/TaskList.css"; // TaskList 스타일 사용

export default function DocumentListPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDocuments = async (title = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = title
        ? `http://localhost:8080/document?title=${encodeURIComponent(title)}`
        : "http://localhost:8080/document";

      const res = await fetch(url);
      if (!res.ok) throw new Error("서버에서 문서 목록을 가져오지 못했습니다.");
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  // 처음 마운트 시 전체 목록 불러오기
  useEffect(() => {
    fetchDocuments();
  }, []);

  // 검색 필터링 (백엔드 검색하니까 프론트 필터링은 그냥 보여주기용)
  // 입력에 따라 바로 fetchDocuments 호출하는게 과부하 걱정되면 debounce 적용 가능
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    fetchDocuments(val.trim());
  };

  return (
    <div className="container">
      <h1>문서 목록</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="제목 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => fetchDocuments(searchTerm)}>🔄 새로고침</button>
      </div>

      {loading && <p style={{ marginTop: 10 }}>조회 중...</p>}
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      <table className="task-table">
        <thead>
          <tr>
            <th>문서 ID</th>
            <th>제목</th>
            <th>등록일</th>
            <th>첨부파일</th>
          </tr>
        </thead>
        <tbody>
          {docs.length === 0 && !loading && !error ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                📭 조회 결과가 없습니다.
              </td>
            </tr>
          ) : (
            docs.map((doc, idx) => (
              <tr key={doc.docId || idx}>
                <td>{doc.docId}</td>
                <td>{doc.docTitle}</td>
                <td>{new Date(doc.createdAt).toLocaleString()}</td>
                <td>
                  {doc.fileUploadPath ? (
                    <a
                      href={`http://localhost:8080/uploads/${doc.fileUploadPath}`}
                      download
                    >
                      다운로드
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

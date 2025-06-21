import React, { useState, useEffect } from 'react';
import CircleList from '../../components/CircleList';

export default function SearchPage() {
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/circle/popular')
      .then(res => res.json())
      .then(data => setPopular(data))
      .catch(console.error);
    fetch('http://localhost:8080/circle/new')
      .then(res => res.json())
      .then(data => setLatest(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    fetch(`http://localhost:8080/circle/search?query=${encodeURIComponent(searchTerm)}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(console.error);
  }, [searchTerm]);

  return (
    <div className="search-page">
      <input
        placeholder="검색"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {searchTerm.trim()
        ? <CircleList circles={results} />
        : (
          <>
            <h2>인기 동호회</h2>
            <CircleList circles={popular} />
            <h2>신규 동호회</h2>
            <CircleList circles={latest} />
          </>
        )}
    </div>
  );
}
import React from 'react';
import '../styles/CircleList.css';

export default function CircleList({ circles }) {
  return (
    <ul className="circle-list">
      {circles.map(c => (
        <li key={c.circleId}>
          <h3>{c.name} <span>({c.memberCount}명)</span></h3>
          <p>{c.description}</p>
          <small>{new Date(c.createdAt).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
  );
}
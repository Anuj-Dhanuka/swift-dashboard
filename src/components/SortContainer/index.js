import React from 'react';
import { SORT_DIRECTIONS } from '../../utils/sorting';
import './SortContainer.css';

const SortContainer = ({ sortField, sortOrder, onSort }) => {
  const headers = [
    { key: 'postId', label: 'Post ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const getArrow = (key) => {
    if (key !== sortField) return '';
    switch (sortOrder) {
      case SORT_DIRECTIONS.ASC:
        return '↑';
      case SORT_DIRECTIONS.DESC:
        return '↓';
      default:
        return '';
    }
  };

  return (
    <div className="sort-container">
      <div className="sort-buttons">
        {headers.map((h) => (
          <button
            key={h.key}
            className={`sort-button ${sortField === h.key ? 'active' : ''}`}
            onClick={() => onSort(h.key)}
            title={`Sort by ${h.label}`}
          >
            <span className="sort-label">{h.label}</span>
            {getArrow(h.key) && (
              <span className="sort-arrow" style={{ marginLeft: 8 }}>{getArrow(h.key)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortContainer;

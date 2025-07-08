// src/components/CommentTable.js
import './CommentTable.css';
import { SORT_DIRECTIONS } from '../../utils/sorting';

const headers = [
  { key: 'postId', label: 'Post ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'comment', label: 'Comment' }
];

const CommentTable = ({ data, sortField, sortOrder, onSort }) => {
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
    <div className="table-container">
      <table className="comment-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h.key} onClick={() => onSort(h.key)}>
                <div className="header-cell">
                  {h.label}
                  <span className="sort-arrow">{getArrow(h.key)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                No results found. Try adjusting your search or filters.
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr key={c.id}>
                <td data-label="Post ID" style={{ width: '10%' }}><span className="post-id-value">{c.postId}</span></td>
                <td data-label="Name" style={{ width: '20%' }}>{c.name}</td>
                <td data-label="Email" style={{ width: '20%' }}>{c.email}</td>
                <td data-label="Comment" style={{ width: '50%' }}>{c.body}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommentTable;

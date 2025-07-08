// src/components/Pagination.js
import React, { useEffect, useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange, pageSize, onPageSizeChange }) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  // Calculate maximum number of visible pages based on container width
  const calculateMaxVisiblePages = () => {
    const container = document.querySelector('.page-numbers');
    if (!container) return 5;

    const containerWidth = container.offsetWidth;
    const buttonWidth = 32;
    const gapWidth = 8;
    const padding = 16;

    const maxButtons = Math.floor((containerWidth - padding) / (buttonWidth + gapWidth));
    return Math.max(3, Math.min(maxButtons, 7));
  };

  // Update max visible pages when container size changes
  useEffect(() => {
    const container = document.querySelector('.page-numbers');
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      setMaxVisiblePages(calculateMaxVisiblePages());
    });

    resizeObserver.observe(container);
    return () => resizeObserver.unobserve(container);
  }, []);

  // Calculate which pages to show
  const visiblePages = Math.min(maxVisiblePages, totalPages);
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        {/* Main Navigation */}
        <div className="nav-group">
          <button
            className={`nav-button ${hasPrev ? '' : 'disabled'}`}
            onClick={() => hasPrev && onPageChange(1)}
            disabled={!hasPrev}
            title="First page"
          >
            <span className="nav-icon">«</span>
          </button>
          <button
            className={`nav-button ${hasPrev ? '' : 'disabled'}`}
            onClick={() => hasPrev && onPageChange(currentPage - 1)}
            disabled={!hasPrev}
            title="Previous page"
          >
            <span className="nav-icon">←</span>
          </button>

          <div className="page-numbers">
            {startPage > 1 && (
              <button
                className="page-button"
                onClick={() => onPageChange(1)}
                title="Go to first page"
              >
                1
              </button>
            )}
            {startPage > 2 && <span className="ellipsis">...</span>}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`page-button ${number === currentPage ? 'active' : ''}`}
                title={`Go to page ${number}`}
              >
                {number}
              </button>
            ))}
            {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
            {endPage < totalPages && (
              <button
                className="page-button"
                onClick={() => onPageChange(totalPages)}
                title="Go to last page"
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            className={`nav-button ${hasNext ? '' : 'disabled'}`}
            onClick={() => hasNext && onPageChange(currentPage + 1)}
            disabled={!hasNext}
            title="Next page"
          >
            <span className="nav-icon">→</span>
          </button>
          <button
            className={`nav-button ${hasNext ? '' : 'disabled'}`}
            onClick={() => hasNext && onPageChange(totalPages)}
            disabled={!hasNext}
            title="Last page"
          >
            <span className="nav-icon">»</span>
          </button>
        </div>

        {/* Page Size Selector */}
        <div className="page-size-selector">
          <div className="selector-wrapper">
            <label className="selector-label">Items per page:</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="selector-input"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

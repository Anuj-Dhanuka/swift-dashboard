// src/pages/Dashboard.js
import React, { useEffect, useState, useMemo } from 'react';
import CommentTable from '../../components/CommentTable';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Navbar from '../../components/Navbar';
import SortContainer from '../../components/SortContainer';
import { SORT_DIRECTIONS, sortData, getNextSortOrder } from '../../utils/sorting';
import './Dashboard.css';

const COMMENTS_API = 'https://jsonplaceholder.typicode.com/comments';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('postId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const state = JSON.parse(localStorage.getItem('dashboardState') || '{}');
      if (state.sortField) setSortField(state.sortField); else setSortField('postId');
      if (state.sortOrder) setSortOrder(state.sortOrder); else setSortOrder('asc');
      if (state.searchTerm) setSearchTerm(state.searchTerm);
      if (state.pageSize) setPageSize(state.pageSize);
      if (state.currentPage) setCurrentPage(state.currentPage);
    } catch (error) {
      console.error('Error loading dashboard state:', error);
    }
  }, []);

  // Persist searchTerm
  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('dashboardState') || '{}');
    localStorage.setItem('dashboardState', JSON.stringify({
      ...state,
      searchTerm
    }));
  }, [searchTerm]);

  // Persist sort field and order
  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('dashboardState') || '{}');
    localStorage.setItem('dashboardState', JSON.stringify({
      ...state,
      sortField,
      sortOrder
    }));
  }, [sortField, sortOrder]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(COMMENTS_API);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter data
  const filtered = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.body.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  // Sort data
  const sorted = useMemo(() => {
    if (!sortField) return filtered;
    return [...filtered].sort((a, b) => {
      if (sortField === 'postId') {
        return sortOrder === 'asc' ? a.postId - b.postId : b.postId - a.postId;
      }
      const aValue = a[sortField]?.toString().toLowerCase() || '';
      const bValue = b[sortField]?.toString().toLowerCase() || '';
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filtered, sortField, sortOrder]);

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = sorted.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(sorted.length / pageSize));
  }, [sorted, pageSize]);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    const state = JSON.parse(localStorage.getItem('dashboardState') || '{}');
    localStorage.setItem('dashboardState', JSON.stringify({
      ...state,
      pageSize: size,
      currentPage: 1
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const state = JSON.parse(localStorage.getItem('dashboardState') || '{}');
    localStorage.setItem('dashboardState', JSON.stringify({
      ...state,
      currentPage: page
    }));
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header mobile-reverse-header">
            <div className="sort-container-wrapper">
              <SortContainer
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={(field) => {
                  if (field !== sortField) {
                    setSortField(field);
                    setSortOrder(SORT_DIRECTIONS.ASC);
                  } else {
                    setSortOrder(getNextSortOrder(sortOrder));
                  }
                }}
              />
            </div>
            <div className="search-container">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>

          <CommentTable
            data={paginated}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={(field) => {
              if (field !== sortField) {
                setSortField(field);
                setSortOrder(SORT_DIRECTIONS.ASC);
              } else {
                setSortOrder(getNextSortOrder(sortOrder));
              }
            }}
          />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './DynamicTable.module.css';

const DynamicTable = ({ dataType }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_BASE_URL = 'https://api.smlnexgenllp.com';

  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define fetchData outside so it can be used in multiple effects
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = dataType === 'contact' ? '/api/contact' : '/api/book-service';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      // Reverse data to show newest first
      const updatedResult = result.reverse();
      if (isMounted) {
        setData(updatedResult);
        setFilteredData(updatedResult);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error('Fetch error details:', err);
      if (isMounted) {
        setError(err.message);
      }
    }
    setLoading(false);
  }, [API_BASE_URL, dataType, isMounted]);

  // Initial fetch when component mounts or dataType changes
  useEffect(() => {
    if (dataType && isMounted) {
      fetchData();
    }
  }, [dataType, isMounted, fetchData]);

  // Poll the API every 10 seconds for new data
  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // every 60 seconds
    return () => clearInterval(interval);
  }, [dataType, isMounted, fetchData]);

  useEffect(() => {
    if (!isMounted) return;
    const filtered = data.filter(item =>
      Object.values(item)
        .map(value => (value || '').toString().toLowerCase())
        .some(value => value.includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data, isMounted]);

  const getHeaders = () => {
    if (dataType === 'contact') {
      return [
        { label: 'SNo', key: null },
        { label: 'Applied Date', key: 'submissionDate' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Message', key: 'message' },
        { label: 'Actions', key: null },
      ];
    } else if (dataType === 'booking') {
      return [
        { label: 'SNo', key: null },
        { label: 'Applied Date', key: 'submissionDate' },
        { label: 'Name', key: 'fullName' },
        { label: 'Email', key: 'email' },
        { label: 'Number', key: 'phoneNumber' },
        { label: 'Preferred Date', key: 'date' },
        { label: 'Reason', key: 'reason' },
        { label: 'Service', key: 'selectedService' },
        { label: 'Actions', key: null },
      ];
    }
    return [];
  };

  const sortData = (key) => {
    if (!key) return;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  const exportToCSV = () => {
    const headers = getHeaders().map(h => h.label).slice(0, -1);
    const csvRows = [
      headers.join(','),
      ...filteredData.map((item, index) =>
        getHeaders()
          .slice(0, -1)
          .map(h => {
            if (h.label === 'SNo') return `"${index + 1}"`;
            return `"${(item[h.key] || '').toString().replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataType}-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Export only today's records to CSV
  const exportTodayRecordsToCSV = () => {
    const headers = getHeaders().map(h => h.label).slice(0, -1);
    const today = new Date().toISOString().split('T')[0];
    const todayData = filteredData.filter(item => {
      if (!item.submissionDate) return false;
      return item.submissionDate.startsWith(today);
    });
    const csvRows = [
      headers.join(','),
      ...todayData.map((item, index) =>
        getHeaders()
          .slice(0, -1)
          .map(h => {
            if (h.label === 'SNo') return `"${index + 1}"`;
            return `"${(item[h.key] || '').toString().replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataType}-today-data-${today}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (index) => {
    if (!confirm(`Are you sure you want to delete this ${dataType}?`)) return;
    try {
      const endpoint = dataType === 'contact' ? '/api/contact' : '/api/book-service';
      const response = await fetch(`${API_BASE_URL}${endpoint}/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setFilteredData(newData.filter(item =>
        Object.values(item)
          .map(value => (value || '').toString().toLowerCase())
          .some(value => value.includes(searchTerm.toLowerCase()))
      ));
      setCurrentPage(1);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    }
  };

  const renderRow = (item, index) => {
    const displayIndex = (currentPage - 1) * itemsPerPage + index + 1;
    if (dataType === 'contact') {
      return (
        <tr key={index}>
          <td>{displayIndex}</td>
          <td>{item.submissionDate}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.message}</td>
          <td>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete((currentPage - 1) * itemsPerPage + index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    } else if (dataType === 'booking') {
      return (
        <tr key={index}>
          <td>{displayIndex}</td>
          <td>{item.submissionDate}</td>
          <td>{item.fullName}</td>
          <td>{item.email}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.date}</td>
          <td>{item.reason}</td>
          <td>{item.selectedService}</td>
          <td>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete((currentPage - 1) * itemsPerPage + index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
    return null;
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate today's records count to conditionally disable the button
  const today = new Date().toISOString().split('T')[0];
  const todayDataCount = filteredData.filter(
    item => item.submissionDate && item.submissionDate.startsWith(today)
  ).length;

  if (!isMounted) return <div>Loading...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dynamicTableContainer}>
      <div className={styles.tableHeader}>
        <h2>{dataType === 'contact' ? 'Contact List' : 'Booking List'}</h2>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder={`Search ${dataType === 'contact' ? 'contacts' : 'bookings'}...`}
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <button className={styles.exportButton} onClick={exportToCSV}>
            Export to CSV
          </button>
          <button
            className={styles.exportButton}
            onClick={exportTodayRecordsToCSV}
            disabled={todayDataCount === 0}
          >
            Today Records
          </button>
        </div>
      </div>
      <table className={styles.dynamicTable}>
        <thead>
          <tr>
            {getHeaders().map((header, idx) => (
              <th
                key={idx}
                onClick={() => sortData(header.key)}
                className={`${styles.sortable} ${
                  sortConfig.key === header.key ? styles[sortConfig.direction] : ''
                }`}
              >
                {header.label}
                {sortConfig.key === header.key && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={getHeaders().length}>
                No {dataType} available{searchTerm ? ' for this search' : ''}
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => renderRow(item, index))
          )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div className={styles.paginationControls}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
        <div className={styles.totalCount}>
          Showing {paginatedData.length} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;

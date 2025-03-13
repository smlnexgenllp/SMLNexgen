'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // You might need to adjust this URL based on your environment
  const API_BASE_URL = 'http://192.168.0.197:5000'; // or whatever port your backend is running on

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Make sure this URL matches exactly what's defined in your routes
      const response = await fetch(`${API_BASE_URL}/api/users/`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. ' + err.message);
      console.error('Error fetching users:', err);
      console.error('Backend might not be running or the endpoint might be incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Remove user from state
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setSuccessMessage(`User ${userName} deleted successfully`);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (err) {
        setError('Failed to delete user. ' + err.message);
        console.error('Error deleting user:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    if (a[sortField] > b[sortField]) {
      comparison = 1;
    } else if (a[sortField] < b[sortField]) {
      comparison = -1;
    }
    return sortDirection === 'desc' ? comparison * -1 : comparison;
  });

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle per page change
  const handlePerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Calculate total pages
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <>
      <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
        Back to Dashboard
      </Link>
      <br />
      <br />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>User Management</h1>

        {error && (
          <div className={styles.errorAlert}>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <div className={styles.tableControls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search users..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.paginationControls}>
            <span>Show</span>
            <select 
              value={usersPerPage} 
              onChange={handlePerPageChange}
              className={styles.perPageSelect}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries per page</span>
          </div>
        </div>

        {loading && users.length === 0 ? (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={styles.tableHeaderCell}>
                    S.No
                  </th>
                  <th
                    className={styles.tableHeaderCell}
                    onClick={() => handleSort('id')}
                  >
                    User ID {sortField === 'id' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    className={styles.tableHeaderCell}
                    onClick={() => handleSort('fullName')}
                  >
                    Full Name {sortField === 'fullName' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    className={styles.tableHeaderCell}
                    onClick={() => handleSort('email')}
                  >
                    Email {sortField === 'email' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    className={styles.tableHeaderCell}
                    onClick={() => handleSort('phone')}
                  >
                    Phone {sortField === 'phone' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    className={styles.tableHeaderCell}
                    onClick={() => handleSort('address')}
                  >
                    Address {sortField === 'address' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th
                    className={styles.tableHeaderCell}
                    onClick={() => handleSort('gender')}
                  >
                    Gender {sortField === 'gender' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{indexOfFirstUser + index + 1}</td>
                      <td className={styles.tableCell}>{user.id}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.userImageContainer}>
                          {user.profilePic && (
                            <Image
                              src={user.profilePic ? `${API_BASE_URL}${user.profilePic}` : '/placeholder-avatar.png'}
                              alt={user.fullName}
                              className={styles.userImage}
                              width={100} // Adjust width as needed
                              height={100} // Adjust height as needed
                              onError={(e) => {
                                e.target.src = '/placeholder-avatar.png';
                              }}
                            />
                          )}
                          {user.fullName}
                        </div>
                      </td>
                      <td className={styles.tableCell}>{user.email}</td>
                      <td className={styles.tableCell}>{user.phone}</td>
                      <td className={styles.tableCell}>{user.address}</td>
                      <td className={styles.tableCell}>{user.gender}</td>
                      <td className={styles.tableCell}>
                        <Link href={`/Admin/Users/Edit/${user.id}`} className={styles.editLink}>
                          Edit
                        </Link>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteUser(user.id, user.fullName)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className={styles.noResults}>
                      {searchTerm ? 'No users found matching your search' : 'No users available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination component */}
        {sortedUsers.length > 0 && (
          <div className={styles.pagination}>
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              &laquo; First
            </button>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              &lt; Prev
            </button>
            
            <div className={styles.pageNumbers}>
              {[...Array(totalPages).keys()].map(number => {
                // Only show a few page numbers around the current page
                if (
                  number + 1 === 1 || 
                  number + 1 === totalPages || 
                  (number + 1 >= currentPage - 1 && number + 1 <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`${styles.pageNumber} ${currentPage === number + 1 ? styles.activePage : ''}`}
                    >
                      {number + 1}
                    </button>
                  );
                } else if (
                  (number + 1 === currentPage - 2 && currentPage > 3) || 
                  (number + 1 === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={number + 1} className={styles.ellipsis}>...</span>;
                }
                return null;
              })}
            </div>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Next &gt;
            </button>
            
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Last &raquo;
            </button>
          </div>
        )}

        <div className={styles.statsContainer}>
          <p>
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length} entries
            {searchTerm && ` (filtered from ${users.length} total entries)`}
          </p>
        </div>
      </div>
    </>
  );
}
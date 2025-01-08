// PCListFilters.js
import React from 'react';
import styles from './PCListFilters.module.css';

const PCListFilters = ({ pcList, filters, setFilters, search, setSearch }) => {
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Helper function to get unique values for a specific key
  const getUniqueValues = (key) => {
    return [...new Set(pcList.map((pc) => pc[key]))];
  };

  const uniqueDepartments = getUniqueValues('department');
  const uniqueOS = getUniqueValues('os');
  const uniqueRatings = getUniqueValues('pcRating');

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="Search by employee name"
        value={search}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <select name="department" value={filters.department} onChange={handleFilterChange} className={styles.select}>
        <option value="">All Departments</option>
        {uniqueDepartments.map((department) => (
          <option key={department} value={department}>{department}</option>
        ))}
      </select>
      <select name="os" value={filters.os} onChange={handleFilterChange} className={styles.select}>
        <option value="">All OS</option>
        {uniqueOS.map((os) => (
          <option key={os} value={os}>{os}</option>
        ))}
      </select>
      <select name="pcRating" value={filters.pcRating} onChange={handleFilterChange} className={styles.select}>
        <option value="">All Ratings</option>
        {uniqueRatings.map((rating) => (
          <option key={rating} value={rating}>{rating}</option>
        ))}
      </select>
    </div>
  );
};

export default PCListFilters;

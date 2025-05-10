import React, { useState } from 'react';

const Pagination = () => {
  const totalItems = 50;
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          href="#"
          key={i}
          onClick={() => goToPage(i)}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            backgroundColor: currentPage === i ? '#0F7268' : '#ddd',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          {i}
        </a>
      );
    }
    return pages;
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <a
        href="#"
        onClick={() => goToPage(currentPage - 1)}
        style={{
          padding: '10px 20px',
          margin: '0 5px',
          backgroundColor: '#009688',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        &laquo; Prev
      </a>
      {renderPagination()}
      <a
        href="#"
        onClick={() => goToPage(currentPage + 1)}
        style={{
          padding: '10px 20px',
          margin: '0 5px',
          backgroundColor: '#009688',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Next &raquo;
      </a>
    </div>
  );
};

export default Pagination;

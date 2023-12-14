import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { StoreItem, IStoreItem } from './StoreItem';

interface IStoreItems {
  storeItems: Array<IStoreItem>;
  title: string;
};

export const StoreItems = (props: IStoreItems): JSX.Element => {
  const { storeItems, title} = props;
  const [sortDirection, setSortDirection] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setSortDirection('none');
    setCurrentPage(1);
  }, [storeItems]);

  const handleSort = () => {
    setSortDirection((prevDirection) =>
      prevDirection === 'none' ? 'asc' : prevDirection === 'asc' ? 'desc' : 'none'
    )
  };

  const sortMethods = {
    none: { method: (a: IStoreItem, b: IStoreItem) => (a.id < b.id ? -1 : 1) },
    asc: { method: (a: IStoreItem, b: IStoreItem) => (a.name < b.name ? -1 : 1) },
    desc: { method: (a: IStoreItem, b: IStoreItem) => (a.name > b.name ? -1 : 1) },
  };

  const totalPages = Math.ceil(storeItems.length / itemsPerPage);
  const paginatedItems = storeItems.sort((sortMethods as any)[sortDirection]?.method).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  };

  return (
    <main>
      <h1 onClick={handleSort}>{title}<span>{sortDirection === 'asc' ? <>&uarr;</> : sortDirection === 'desc' ? <>&darr;</> : ''}</span></h1>
      <Row md={2} xs={1} lg={3} className="g-3 mb-3">
        {paginatedItems.map((item: IStoreItem) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          {'<'}
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          {'>'}
        </button>
      </div>
    </main>
  )
}

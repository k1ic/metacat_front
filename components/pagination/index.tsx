import React, { useState } from 'react';
import cn from 'classnames';
import ReactPaginate from 'react-paginate';

import styles from './index.module.css';

type Props = {
  total?: number;
  pageNumber?: number;
  pageSize?: number;
  pageChange?: (e) => void;
};

export default function Pagination({ total, pageNumber, pageSize, pageChange }: Props) {
  const [currentItems, setCurrentItems] = useState(pageNumber);
  const [pageCount, setPageCount] = useState(total);
  const [itemOffset, setItemOffset] = useState(pageSize);

  const handlePageClick = (page) => {
    if (pageChange) {
      pageChange(page);
    }
  };

  const jumpTopage = React.useCallback(
    (e) => {
      if (e.keyCode === 13) {
        const toPage = Number(e.target.value);
        if (!Number.isNaN(toPage)) {
          let limit = toPage - 1 < 0 ? 0 : toPage - 1;
          limit = limit >= pageCount ? pageCount - 1 : limit;
          setCurrentItems(limit);
          handlePageClick(limit);
        }
      }
    },
    [null],
  );

  const baseCls = cn(
    'flex justify-center items-center text-gray-400 font-semibold text-base',
    styles.baseBtn,
  );

  return (
    <div className="flex justify-center items-center mb-7">
      <ReactPaginate
        className="flex items-center"
        pageClassName={baseCls}
        activeClassName={styles.active}
        breakClassName={baseCls}
        breakLabel="..."
        nextLabel={null}
        onPageChange={(event) => {
          handlePageClick(event.selected);
        }}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        forcePage={currentItems}
        previousLabel={null}
        renderOnZeroPageCount={null}
      />
      <div>
        <span className="text-gray-400 ml-7 mr-1">Skip to page</span>
        <input
          className={cn('font-semibold text-base text-white', styles.jump)}
          type="text"
          onKeyDown={jumpTopage}
        ></input>
      </div>
    </div>
  );
}

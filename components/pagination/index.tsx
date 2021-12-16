import React from 'react';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

type Props = {
  total?: number;
  pageSize?: number;
  pageNumber?: number;
};

export default function PagiNation({ total, pageSize, pageNumber }: Props) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(pageNumber);
  const [pageCount, setPageCount] = React.useState(total);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(pageSize);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(event.selected);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

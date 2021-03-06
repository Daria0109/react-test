import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {PagePicker, PagesControl, PaginatorBlock} from './styles';

function Paginator ({postsLimit, currentPage, setCurrentPage, totalPostsCount}) {
  const portionSize = 7
  const [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));

  const prevButtonHandler = () => {
    setCurrentPage(currentPage - 1)
    setPortionNumber(portionNumber - 1)
  }
  const nextButtonHandler = () => {
    setCurrentPage(currentPage + 1)
    setPortionNumber(portionNumber + 1)
  }

  const pageCount = Math.ceil(totalPostsCount / postsLimit);
  const pages = [];
  for (let i = 1; i <= pageCount; i += 1) {
    pages.push(i);
  }

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  return <PaginatorBlock>
    {<PagesControl type='button' onClick={prevButtonHandler}
             disabled={portionNumber === 1}>&#171;</PagesControl>}
    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p, i) => <PagePicker key={i}
                                 type='button'
                                 localCurrentPage={p}
                                 propsCurrentPage={currentPage}
                                 onClick={() => setCurrentPage(p)}> {p} </PagePicker>)
    }
    {<PagesControl type='button' onClick={nextButtonHandler}
             disabled={portionNumber === Math.ceil(pageCount / portionSize)}>&#187;</PagesControl>}
  </PaginatorBlock>
}
Paginator.propTypes = {
  postsLimit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPostsCount: PropTypes.number.isRequired
}

export default Paginator;

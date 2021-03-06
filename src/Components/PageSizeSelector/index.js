import PropTypes from 'prop-types'
import React from 'react'
import { PageSizeBlock, PageSizePicker } from './styles'


function PageSizeSelector({ postsLimit, setPostsLimit }) {
  const pageSizeArr = [5, 10, 20, 30, 50]
  return <PageSizeBlock>
    {pageSizeArr.map(ps =>
      <PageSizePicker
        type='button'
        localPostsLimit={ps}
        propsPostsLimit={postsLimit}
        key={ps}
        onClick={() => setPostsLimit(ps)}>{ps}</PageSizePicker>)}
  </PageSizeBlock>
}

PageSizeSelector.propTypes = {
  setPostsLimit: PropTypes.func.isRequired,
  postsLimit: PropTypes.number.isRequired
}

export default PageSizeSelector;

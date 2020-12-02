import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'

export const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination
        showFirstButton
        showLastButton
        count={pages}
        page={page}
        renderItem={(i) => (
          <PaginationItem
            component={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i.page}`
                  : `/page/${i.page}`
                : `/admin/productlist/${i.page}`
            }
            {...i}
          />
        )}
      />
    )
  )
}

import { Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'

export const ReviewPaginate = ({ page, handleChange }) => {
  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  let noOfPages = Math.ceil(product.reviews.length / 2)

  return (
    product.reviews.length !== 0 &&
    product.reviews.length > 2 && (
      <Grid container justify='center' style={{ margin: 10, padding: 10 }}>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color='primary'
          size='small'
        />
      </Grid>
    )
  )
}
